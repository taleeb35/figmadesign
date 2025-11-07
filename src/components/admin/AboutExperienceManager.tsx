import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface AboutExperience {
  id: string;
  years_text: string;
  title: string;
  description: string;
  stat1_value: string;
  stat1_label: string;
  stat2_value: string;
  stat2_label: string;
  stat3_value: string;
  stat3_label: string;
  image_url: string | null;
}

export function AboutExperienceManager() {
  const [experience, setExperience] = useState<AboutExperience | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const { data, error } = await supabase
        .from("about_experience")
        .select("*")
        .maybeSingle();

      if (error) throw error;
      setExperience(data);
    } catch (error: any) {
      toast.error("Failed to load experience section");
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

      setExperience(prev => prev ? { ...prev, image_url: publicUrl } : null);
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!experience) return;

    setSaving(true);
    try {
      if (experience.id && experience.id !== "") {
        const { error } = await supabase
          .from("about_experience")
          .update({
            years_text: experience.years_text,
            title: experience.title,
            description: experience.description,
            stat1_value: experience.stat1_value,
            stat1_label: experience.stat1_label,
            stat2_value: experience.stat2_value,
            stat2_label: experience.stat2_label,
            stat3_value: experience.stat3_value,
            stat3_label: experience.stat3_label,
            image_url: experience.image_url,
          })
          .eq("id", experience.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("about_experience").insert([
          {
            years_text: experience.years_text,
            title: experience.title,
            description: experience.description,
            stat1_value: experience.stat1_value,
            stat1_label: experience.stat1_label,
            stat2_value: experience.stat2_value,
            stat2_label: experience.stat2_label,
            stat3_value: experience.stat3_value,
            stat3_label: experience.stat3_label,
            image_url: experience.image_url,
          },
        ]);
        if (error) throw error;
      }

      toast.success("Experience section saved successfully");
      fetchExperience();
    } catch (error: any) {
      toast.error("Failed to save experience section");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  const defaultExperience: AboutExperience = {
    id: "", years_text: "", title: "", description: "",
    stat1_value: "", stat1_label: "", stat2_value: "", stat2_label: "",
    stat3_value: "", stat3_label: "", image_url: null
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Experience Section</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="years_text">Years Text</Label>
          <Input
            id="years_text"
            value={experience?.years_text || ""}
            onChange={(e) => setExperience(prev => ({ ...(prev || defaultExperience), years_text: e.target.value }))}
            placeholder="e.g., 10+ Years"
            required
          />
        </div>

        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={experience?.title || ""}
            onChange={(e) => setExperience(prev => ({ ...(prev || defaultExperience), title: e.target.value }))}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={experience?.description || ""}
            onChange={(e) => setExperience(prev => ({ ...(prev || defaultExperience), description: e.target.value }))}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="stat1_value">Statistic 1 Value</Label>
            <Input
              id="stat1_value"
              value={experience?.stat1_value || ""}
              onChange={(e) => setExperience(prev => ({ ...(prev || defaultExperience), stat1_value: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="stat1_label">Statistic 1 Label</Label>
            <Input
              id="stat1_label"
              value={experience?.stat1_label || ""}
              onChange={(e) => setExperience(prev => ({ ...(prev || defaultExperience), stat1_label: e.target.value }))}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="stat2_value">Statistic 2 Value</Label>
            <Input
              id="stat2_value"
              value={experience?.stat2_value || ""}
              onChange={(e) => setExperience(prev => ({ ...(prev || defaultExperience), stat2_value: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="stat2_label">Statistic 2 Label</Label>
            <Input
              id="stat2_label"
              value={experience?.stat2_label || ""}
              onChange={(e) => setExperience(prev => ({ ...(prev || defaultExperience), stat2_label: e.target.value }))}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="stat3_value">Statistic 3 Value</Label>
            <Input
              id="stat3_value"
              value={experience?.stat3_value || ""}
              onChange={(e) => setExperience(prev => ({ ...(prev || defaultExperience), stat3_value: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="stat3_label">Statistic 3 Label</Label>
            <Input
              id="stat3_label"
              value={experience?.stat3_label || ""}
              onChange={(e) => setExperience(prev => ({ ...(prev || defaultExperience), stat3_label: e.target.value }))}
              required
            />
          </div>
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
          {experience?.image_url && (
            <img src={experience.image_url} alt="Experience" className="mt-2 w-32 h-32 object-cover rounded" />
          )}
        </div>

        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>
      </form>
    </div>
  );
}