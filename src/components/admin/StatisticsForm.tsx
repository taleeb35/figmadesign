import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type StatisticsFormProps = {
  statisticId: string | null;
  onSuccess: () => void;
  onCancel: () => void;
};

type Category = {
  id: string;
  name: string;
};

const StatisticsForm = ({ statisticId, onSuccess, onCancel }: StatisticsFormProps) => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [externalLink, setExternalLink] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
    if (statisticId) {
      fetchStatistic();
    } else {
      resetForm();
    }
  }, [statisticId]);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("statistics_categories")
      .select("*")
      .order("name");
    setCategories(data || []);
  };

  const fetchStatistic = async () => {
    if (!statisticId) return;

    const { data, error } = await supabase
      .from("statistics")
      .select("*")
      .eq("id", statisticId)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch statistic",
        variant: "destructive",
      });
      return;
    }

    setTitle(data.title);
    setYear(data.year);
    setExternalLink(data.external_link || "");
    setCategoryId(data.category_id || "");
    setCurrentImageUrl(data.image_url || "");
  };

  const resetForm = () => {
    setTitle("");
    setYear(new Date().getFullYear());
    setExternalLink("");
    setCategoryId("");
    setImageFile(null);
    setCurrentImageUrl("");
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `statistics/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('content-files')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('content-files')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = currentImageUrl;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile) || "";
      }

      const statisticData = {
        title,
        year,
        external_link: externalLink,
        category_id: categoryId || null,
        image_url: imageUrl,
      };

      if (statisticId) {
        const { error } = await supabase
          .from("statistics")
          .update(statisticData)
          .eq("id", statisticId);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Statistic updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("statistics")
          .insert(statisticData);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Statistic created successfully",
        });
      }

      resetForm();
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save statistic",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{statisticId ? "Edit" : "Add"} Statistic</CardTitle>
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
              onChange={(e) => setYear(parseInt(e.target.value))}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="externalLink">External Link</Label>
            <Input
              id="externalLink"
              type="url"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div>
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
            {currentImageUrl && !imageFile && (
              <img src={currentImageUrl} alt="Current" className="mt-2 w-32 h-32 object-cover rounded" />
            )}
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : statisticId ? "Update" : "Add"} Statistic
            </Button>
            {statisticId && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default StatisticsForm;
