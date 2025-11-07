import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface AboutAdvantage {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  point1: string;
  point2: string;
  point3: string;
  point4: string;
  point5: string;
  point6: string;
}

export function AboutAdvantageManager() {
  const [advantage, setAdvantage] = useState<AboutAdvantage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchAdvantage();
  }, []);

  const fetchAdvantage = async () => {
    try {
      const { data, error } = await supabase
        .from("about_advantage")
        .select("*")
        .maybeSingle();

      if (error) throw error;
      setAdvantage(data);
    } catch (error: any) {
      toast.error("Failed to load advantage section");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('content-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('content-files')
        .getPublicUrl(filePath);

      setAdvantage(prev => prev ? { ...prev, image_url: publicUrl } : null);
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!advantage) return;

    setSaving(true);
    try {
      if (advantage.id && advantage.id !== "") {
        const { error } = await supabase
          .from("about_advantage")
          .update({
            title: advantage.title,
            description: advantage.description,
            image_url: advantage.image_url,
            point1: advantage.point1,
            point2: advantage.point2,
            point3: advantage.point3,
            point4: advantage.point4,
            point5: advantage.point5,
            point6: advantage.point6,
          })
          .eq("id", advantage.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("about_advantage").insert([
          {
            title: advantage.title,
            description: advantage.description,
            image_url: advantage.image_url,
            point1: advantage.point1,
            point2: advantage.point2,
            point3: advantage.point3,
            point4: advantage.point4,
            point5: advantage.point5,
            point6: advantage.point6,
          },
        ]);
        if (error) throw error;
      }
 
      toast.success("Advantage section saved successfully");
      fetchAdvantage();
    } catch (error: any) {
      toast.error("Failed to save advantage section");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Advantage Section</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={advantage?.title || ""}
            onChange={(e) => setAdvantage(prev => prev ? { ...prev, title: e.target.value } : {
              id: "", title: e.target.value, description: "", image_url: null, point1: "", point2: "", point3: "", point4: "", point5: "", point6: ""
            })}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={advantage?.description || ""}
            onChange={(e) => setAdvantage(prev => prev ? { ...prev, description: e.target.value } : {
              id: "", title: "", description: e.target.value, image_url: null, point1: "", point2: "", point3: "", point4: "", point5: "", point6: ""
            })}
            required
            rows={6}
          />
        </div>

        <div>
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
          />
          {uploading && <p className="text-sm text-muted-foreground mt-2">Uploading...</p>}
          {advantage?.image_url && (
            <img src={advantage.image_url} alt="Advantage" className="mt-2 w-32 h-32 object-cover rounded" />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="point1">Point 1 (e.g., Specialization)</Label>
            <Input
              id="point1"
              value={advantage?.point1 || ""}
              onChange={(e) => setAdvantage(prev => prev ? { ...prev, point1: e.target.value } : {
                id: "", title: "", description: "", image_url: null, point1: e.target.value, point2: "", point3: "", point4: "", point5: "", point6: ""
              })}
            />
          </div>
          <div>
            <Label htmlFor="point2">Point 2 (e.g., Clarity)</Label>
            <Input
              id="point2"
              value={advantage?.point2 || ""}
              onChange={(e) => setAdvantage(prev => prev ? { ...prev, point2: e.target.value } : {
                id: "", title: "", description: "", image_url: null, point1: "", point2: e.target.value, point3: "", point4: "", point5: "", point6: ""
              })}
            />
          </div>
          <div>
            <Label htmlFor="point3">Point 3 (e.g., Strategy)</Label>
            <Input
              id="point3"
              value={advantage?.point3 || ""}
              onChange={(e) => setAdvantage(prev => prev ? { ...prev, point3: e.target.value } : {
                id: "", title: "", description: "", image_url: null, point1: "", point2: "", point3: e.target.value, point4: "", point5: "", point6: ""
              })}
            />
          </div>
          <div>
            <Label htmlFor="point4">Point 4 (e.g., Transparency)</Label>
            <Input
              id="point4"
              value={advantage?.point4 || ""}
              onChange={(e) => setAdvantage(prev => prev ? { ...prev, point4: e.target.value } : {
                id: "", title: "", description: "", image_url: null, point1: "", point2: "", point3: "", point4: e.target.value, point5: "", point6: ""
              })}
            />
          </div>
          <div>
            <Label htmlFor="point5">Point 5 (e.g., Creativity)</Label>
            <Input
              id="point5"
              value={advantage?.point5 || ""}
              onChange={(e) => setAdvantage(prev => prev ? { ...prev, point5: e.target.value } : {
                id: "", title: "", description: "", image_url: null, point1: "", point2: "", point3: "", point4: "", point5: e.target.value, point6: ""
              })}
            />
          </div>
          <div>
            <Label htmlFor="point6">Point 6 (e.g., Impact)</Label>
            <Input
              id="point6"
              value={advantage?.point6 || ""}
              onChange={(e) => setAdvantage(prev => prev ? { ...prev, point6: e.target.value } : {
                id: "", title: "", description: "", image_url: null, point1: "", point2: "", point3: "", point4: "", point5: "", point6: e.target.value
              })}
            />
          </div>
        </div>

        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>
      </form>
    </div>
  );
}