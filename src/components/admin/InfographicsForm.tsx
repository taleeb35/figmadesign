import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type InfographicsFormProps = {
  infographicId: string | null;
  onSuccess: () => void;
  onCancel: () => void;
};

const InfographicsForm = ({ infographicId, onSuccess, onCancel }: InfographicsFormProps) => {
  const [title, setTitle] = useState("");
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
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
    setImageFiles(null);
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

  const checkTitleExists = async (title: string): Promise<boolean> => {
    const { data, error } = await supabase
      .from("infographics")
      .select("title")
      .eq("title", title)
      .maybeSingle();

    return !!data && !error;
  };

  const generateUniqueTitle = async (baseTitle: string): Promise<string> => {
    let title = baseTitle;
    let counter = 1;

    while (await checkTitleExists(title)) {
      title = `${baseTitle} ${counter}`;
      counter++;
    }

    return title;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Handle editing existing infographic
      if (infographicId) {
        let imageUrl = currentImageUrl;

        if (imageFiles && imageFiles.length > 0) {
          imageUrl = await uploadImage(imageFiles[0]) || "";
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

        // Check if title was changed and if new title exists
        let finalTitle = title.trim();
        if (finalTitle) {
          const { data: currentData } = await supabase
            .from("infographics")
            .select("title")
            .eq("id", infographicId)
            .single();

          if (currentData && currentData.title !== finalTitle) {
            finalTitle = await generateUniqueTitle(finalTitle);
          }
        }

        const infographicData = {
          title: finalTitle || "Infographic",
          image_url: imageUrl,
        };

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
        // Handle creating multiple new infographics
        if (!imageFiles || imageFiles.length === 0) {
          toast({
            title: "Error",
            description: "At least one image is required",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const infographicsToInsert = [];
        const baseTitle = title.trim() || "Infographic";

        for (let i = 0; i < imageFiles.length; i++) {
          const file = imageFiles[i];
          const imageUrl = await uploadImage(file);
          
          if (imageUrl) {
            // Generate unique title for each image
            const uniqueTitle = await generateUniqueTitle(
              imageFiles.length === 1 ? baseTitle : `${baseTitle} ${i + 1}`
            );

            infographicsToInsert.push({
              title: uniqueTitle,
              image_url: imageUrl,
            });
          }
        }

        if (infographicsToInsert.length === 0) {
          toast({
            title: "Error",
            description: "Failed to upload images",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const { error } = await supabase
          .from("infographics")
          .insert(infographicsToInsert);

        if (error) throw error;

        toast({
          title: "Success",
          description: `${infographicsToInsert.length} infographic(s) created successfully`,
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title {!infographicId && "(optional for multiple uploads)"}</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required={!!infographicId}
          placeholder={infographicId ? "" : "Leave empty to auto-generate titles"}
        />
      </div>

      <div>
        <Label htmlFor="image">Image(s) *</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          multiple={!infographicId}
          onChange={(e) => setImageFiles(e.target.files)}
          required={!currentImageUrl}
        />
        {currentImageUrl && !imageFiles && (
          <img src={currentImageUrl} alt="Current" className="mt-2 w-32 h-32 object-cover rounded" />
        )}
        {imageFiles && imageFiles.length > 0 && (
          <p className="mt-2 text-sm text-muted-foreground">
            {imageFiles.length} file(s) selected
          </p>
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
  );
};

export default InfographicsForm;
