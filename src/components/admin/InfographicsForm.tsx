import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type InfographicsFormProps = {
  infographicId: string | null;
  onSuccess: () => void;
  onCancel: () => void;
};

const InfographicsForm = ({ infographicId, onSuccess, onCancel }: InfographicsFormProps) => {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (infographicId) {
      fetchInfographic();
    } else {
      resetForm();
    }
  }, [infographicId]);

  const fetchInfographic = async () => {
    if (!infographicId) return;

    const { data, error } = await supabase
      .from("infographics")
      .select("*")
      .eq("id", infographicId)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch infographic",
        variant: "destructive",
      });
      return;
    }

    setTitle(data.title);
    setCurrentImageUrl(data.image_url || "");
  };

  const resetForm = () => {
    setTitle("");
    setImageFile(null);
    setCurrentImageUrl("");
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `infographics/${fileName}`;

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

      if (!imageUrl) {
        toast({
          title: "Error",
          description: "Image is required",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const infographicData = {
        title,
        image_url: imageUrl,
      };

      if (infographicId) {
        const { error } = await supabase
          .from("infographics")
          .update(infographicData)
          .eq("id", infographicId);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Infographic updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("infographics")
          .insert(infographicData);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Infographic created successfully",
        });
      }

      resetForm();
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save infographic",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{infographicId ? "Edit" : "Add"} Infographic</CardTitle>
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
            <Label htmlFor="image">Image *</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              required={!currentImageUrl}
            />
            {currentImageUrl && !imageFile && (
              <img src={currentImageUrl} alt="Current" className="mt-2 w-32 h-32 object-cover rounded" />
            )}
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : infographicId ? "Update" : "Add"} Infographic
            </Button>
            {infographicId && (
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

export default InfographicsForm;
