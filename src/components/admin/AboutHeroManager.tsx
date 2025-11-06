import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface AboutHero {
  id: string;
  subtitle: string;
  main_title: string;
}

export function AboutHeroManager() {
  const [hero, setHero] = useState<AboutHero | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const { data, error } = await supabase
        .from("about_hero")
        .select("*")
        .maybeSingle();

      if (error) throw error;
      setHero(data);
    } catch (error: any) {
      toast.error("Failed to load about hero section");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hero) return;

    setSaving(true);
    try {
      if (hero.id && hero.id !== "") {
        const { error } = await supabase
          .from("about_hero")
          .update({
            subtitle: hero.subtitle,
            main_title: hero.main_title,
          })
          .eq("id", hero.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("about_hero").insert([
          {
            subtitle: hero.subtitle,
            main_title: hero.main_title,
          },
        ]);
        if (error) throw error;
      }
 
      toast.success("About hero section saved successfully");
      fetchHero();
    } catch (error: any) {
      toast.error("Failed to save about hero section");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">About Us Hero Section</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            value={hero?.subtitle || ""}
            onChange={(e) => setHero(prev => prev ? { ...prev, subtitle: e.target.value } : {
              id: "", subtitle: e.target.value, main_title: ""
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
              id: "", subtitle: "", main_title: e.target.value
            })}
            required
          />
        </div>

        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>
      </form>
    </div>
  );
}