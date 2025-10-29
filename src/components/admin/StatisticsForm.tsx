import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import type { StatisticItem } from "./StatisticsManager";

type Category = {
  id: string;
  name: string;
};

type StatisticsFormProps = {
  item: StatisticItem | null;
  onClose: () => void;
};

const StatisticsForm = ({ item, onClose }: StatisticsFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [year, setYear] = useState(item?.year?.toString() || new Date().getFullYear().toString());
  const [title, setTitle] = useState(item?.title || "");
  const [categoryId, setCategoryId] = useState(item?.category_id || "");
  const [externalLink, setExternalLink] = useState(item?.external_link || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(item?.image_url || "");

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
        year: parseInt(year),
        title,
        external_link: externalLink,
        category_id: categoryId || null,
        created_by: user.id,
      };

      // Handle image upload
      if (imageFile) {
        const url = await uploadFile(imageFile, `statistics/${Date.now()}_${imageFile.name}`);
        dataToSave.image_url = url;
      } else if (item && imageUrl) {
        dataToSave.image_url = imageUrl;
      }

      if (item) {
        const { error } = await supabase
          .from("statistics")
          .update(dataToSave)
          .eq("id", item.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("statistics")
          .insert([dataToSave]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Statistic ${item ? "updated" : "created"} successfully`,
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
        <CardTitle>{item ? "Edit" : "Add"} Statistic</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              required={!item}
            />
            {imageUrl && !imageFile && (
              <p className="text-sm text-muted-foreground mt-1">Current image uploaded</p>
            )}
          </div>

          <div>
            <Label htmlFor="externalLink">External Link</Label>
            <Input
              id="externalLink"
              type="url"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              required
              placeholder="https://..."
            />
          </div>

          <div>
            <Label htmlFor="category">Content Type</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
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

export default StatisticsForm;
