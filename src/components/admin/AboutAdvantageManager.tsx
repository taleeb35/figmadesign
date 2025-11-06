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
}

export function AboutAdvantageManager() {
  const [advantage, setAdvantage] = useState<AboutAdvantage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
          })
          .eq("id", advantage.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("about_advantage").insert([
          {
            title: advantage.title,
            description: advantage.description,
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
              id: "", title: e.target.value, description: ""
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
              id: "", title: "", description: e.target.value
            })}
            required
            rows={6}
          />
        </div>

        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>
      </form>
    </div>
  );
}