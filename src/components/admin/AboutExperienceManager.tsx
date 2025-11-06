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
}

export function AboutExperienceManager() {
  const [experience, setExperience] = useState<AboutExperience | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!experience) return;

    setSaving(true);
    try {
      const { error } = experience.id
        ? await supabase.from("about_experience").update(experience).eq("id", experience.id)
        : await supabase.from("about_experience").insert([experience]);

      if (error) throw error;
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
    stat3_value: "", stat3_label: ""
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

        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>
      </form>
    </div>
  );
}