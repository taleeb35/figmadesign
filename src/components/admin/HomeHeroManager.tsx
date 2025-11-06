import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface HomeHero {
  id: string;
  main_title: string;
  subtitle: string;
  description: string;
  cta_button_text: string;
  cta_button_link: string;
  background_image_url: string | null;
}

export function HomeHeroManager() {
  const [hero, setHero] = useState<HomeHero | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const { data, error } = await supabase
        .from("home_hero")
        .select("*")
        .maybeSingle();

      if (error) throw error;
      setHero(data);
    } catch (error: any) {
      toast.error("Failed to load hero section");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError, data } = await supabase.storage
        .from("content-files")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("content-files")
        .getPublicUrl(fileName);

      setHero(prev => prev ? { ...prev, background_image_url: publicUrl } : null);
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hero) return;

    setSaving(true);
    try {
      const { error } = hero.id
        ? await supabase.from("home_hero").update(hero).eq("id", hero.id)
        : await supabase.from("home_hero").insert([hero]);

      if (error) throw error;
      toast.success("Hero section saved successfully");
      fetchHero();
    } catch (error: any) {
      toast.error("Failed to save hero section");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Home Page Hero Section</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            value={hero?.subtitle || ""}
            onChange={(e) => setHero(prev => prev ? { ...prev, subtitle: e.target.value } : {
              id: "", main_title: "", subtitle: e.target.value, description: "",
              cta_button_text: "View our reports", cta_button_link: "/reports", background_image_url: null
            })}
            required
          />
        </div>

        <div>
          <Label htmlFor="main_title">Main Title</Label>
          <Input
            id="main_title"
            value={hero?.main_title || ""}
            onChange={(e) => setHero(prev => prev ? { ...prev, main_title: e.target.value } : {
              id: "", main_title: e.target.value, subtitle: "", description: "",
              cta_button_text: "View our reports", cta_button_link: "/reports", background_image_url: null
            })}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={hero?.description || ""}
            onChange={(e) => setHero(prev => prev ? { ...prev, description: e.target.value } : {
              id: "", main_title: "", subtitle: "", description: e.target.value,
              cta_button_text: "View our reports", cta_button_link: "/reports", background_image_url: null
            })}
            required
          />
        </div>

        <div>
          <Label htmlFor="cta_button_text">CTA Button Text</Label>
          <Input
            id="cta_button_text"
            value={hero?.cta_button_text || ""}
            onChange={(e) => setHero(prev => prev ? { ...prev, cta_button_text: e.target.value } : {
              id: "", main_title: "", subtitle: "", description: "",
              cta_button_text: e.target.value, cta_button_link: "/reports", background_image_url: null
            })}
            required
          />
        </div>

        <div>
          <Label htmlFor="cta_button_link">CTA Button Link</Label>
          <Input
            id="cta_button_link"
            value={hero?.cta_button_link || ""}
            onChange={(e) => setHero(prev => prev ? { ...prev, cta_button_link: e.target.value } : {
              id: "", main_title: "", subtitle: "", description: "",
              cta_button_text: "View our reports", cta_button_link: e.target.value, background_image_url: null
            })}
            required
          />
        </div>

        <div>
          <Label htmlFor="background_image">Background Image</Label>
          <Input
            id="background_image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
          />
          {hero?.background_image_url && (
            <img src={hero.background_image_url} alt="Background" className="mt-2 h-32 object-cover rounded" />
          )}
        </div>

        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>
      </form>
    </div>
  );
}