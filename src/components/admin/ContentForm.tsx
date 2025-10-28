import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { X, Upload } from "lucide-react";
import type { ContentItem } from "./ContentManager";
import type { ContentCategory } from "./ContentCategoryManager";

type ContentFormProps = {
  item: ContentItem | null;
  onClose: () => void;
};

const ContentForm = ({ item, onClose }: ContentFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ContentCategory[]>([]);
  const [contentType, setContentType] = useState<"pdf" | "flipbook" | "youtube">(item?.content_type || "pdf");
  const [year, setYear] = useState(item?.year?.toString() || new Date().getFullYear().toString());
  const [title, setTitle] = useState(item?.title || "");
  const [categoryId, setCategoryId] = useState(item?.category_id || "");
  
  // Image field for all types
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState(item?.cover_image_url || "");
  
  // PDF fields
  const [englishPdfFile, setEnglishPdfFile] = useState<File | null>(null);
  const [arabicPdfFile, setArabicPdfFile] = useState<File | null>(null);
  const [englishPdfUrl, setEnglishPdfUrl] = useState(item?.english_pdf_url || "");
  const [arabicPdfUrl, setArabicPdfUrl] = useState(item?.arabic_pdf_url || "");
  
  // Flipbook fields
  const [englishFlipbookUrl, setEnglishFlipbookUrl] = useState(item?.english_flipbook_url || "");
  const [arabicFlipbookUrl, setArabicFlipbookUrl] = useState(item?.arabic_flipbook_url || "");
  
  // YouTube fields
  const [youtubeUrl, setYoutubeUrl] = useState(item?.youtube_url || "");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("content_categories")
        .select("*")
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      console.error("Error fetching categories:", error);
    }
  };

  const uploadFile = async (file: File, path: string): Promise<string> => {
    const { data, error } = await supabase.storage
      .from("content-files")
      .upload(path, file, { upsert: true });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from("content-files")
      .getPublicUrl(data.path);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      let dataToSave: any = {
        content_type: contentType,
        year: parseInt(year),
        title,
        category_id: categoryId || null,
        created_by: user.id,
      };

      // Handle cover image upload (for all types)
      if (coverImageFile) {
        const url = await uploadFile(coverImageFile, `covers/${Date.now()}_${coverImageFile.name}`);
        dataToSave.cover_image_url = url;
      } else if (item && coverImageUrl) {
        dataToSave.cover_image_url = coverImageUrl;
      }

      // Handle file uploads and URLs based on content type
      if (contentType === "pdf") {
        if (englishPdfFile) {
          const url = await uploadFile(englishPdfFile, `pdfs/${Date.now()}_en_${englishPdfFile.name}`);
          dataToSave.english_pdf_url = url;
        } else if (item) {
          dataToSave.english_pdf_url = englishPdfUrl;
        }

        if (arabicPdfFile) {
          const url = await uploadFile(arabicPdfFile, `pdfs/${Date.now()}_ar_${arabicPdfFile.name}`);
          dataToSave.arabic_pdf_url = url;
        } else if (item) {
          dataToSave.arabic_pdf_url = arabicPdfUrl;
        }
      } else if (contentType === "flipbook") {
        dataToSave.english_flipbook_url = englishFlipbookUrl || null;
        dataToSave.arabic_flipbook_url = arabicFlipbookUrl || null;
      } else if (contentType === "youtube") {
        dataToSave.youtube_url = youtubeUrl;
      }

      if (item) {
        const { error } = await supabase
          .from("content_items")
          .update(dataToSave)
          .eq("id", item.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("content_items")
          .insert([dataToSave]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Content ${item ? "updated" : "created"} successfully`,
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{item ? "Edit" : "Add"} Content</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="contentType">Content Type</Label>
            <Select value={contentType} onValueChange={(value: any) => setContentType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="flipbook">Flipbook</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              min="1900"
              max="2100"
            />
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Content Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="coverImage">Cover Image</Label>
            <Input
              id="coverImage"
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImageFile(e.target.files?.[0] || null)}
            />
            {coverImageUrl && !coverImageFile && (
              <p className="text-sm text-muted-foreground mt-1">Current image uploaded</p>
            )}
          </div>

          {contentType === "pdf" && (
            <>
              <div>
                <Label htmlFor="englishPdf">English PDF File</Label>
                <Input
                  id="englishPdf"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setEnglishPdfFile(e.target.files?.[0] || null)}
                />
                {englishPdfUrl && !englishPdfFile && (
                  <p className="text-sm text-muted-foreground mt-1">Current file uploaded</p>
                )}
              </div>
              <div>
                <Label htmlFor="arabicPdf">Arabic PDF File</Label>
                <Input
                  id="arabicPdf"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setArabicPdfFile(e.target.files?.[0] || null)}
                />
                {arabicPdfUrl && !arabicPdfFile && (
                  <p className="text-sm text-muted-foreground mt-1">Current file uploaded</p>
                )}
              </div>
            </>
          )}

          {contentType === "flipbook" && (
            <>
              <div>
                <Label htmlFor="englishFlipbook">English Flipbook URL</Label>
                <Input
                  id="englishFlipbook"
                  type="url"
                  value={englishFlipbookUrl}
                  onChange={(e) => setEnglishFlipbookUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="arabicFlipbook">Arabic Flipbook URL</Label>
                <Input
                  id="arabicFlipbook"
                  type="url"
                  value={arabicFlipbookUrl}
                  onChange={(e) => setArabicFlipbookUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </>
          )}

          {contentType === "youtube" && (
            <div>
              <Label htmlFor="youtubeUrl">YouTube URL</Label>
              <Input
                id="youtubeUrl"
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                required
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
          )}

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : item ? "Update" : "Create"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContentForm;
