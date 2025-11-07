import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface HomeHero {
  id: string;
  main_title: string;
  description: string;
  video_url: string | null;
}

export function HomeHeroManager() {
  const [hero, setHero] = useState<HomeHero | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

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

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingVideo(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `hero-videos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("content-files")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("content-files")
        .getPublicUrl(filePath);

      setHero((prev) => prev ? { ...prev, video_url: publicUrl } : {
        id: "", main_title: "", description: "", video_url: publicUrl
      });

      toast.success("Video uploaded successfully");
    } catch (error: any) {
      toast.error("Failed to upload video");
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hero) return;

    setSaving(true);
    try {
      if (hero.id && hero.id !== "") {
        // Update existing hero
        const { error } = await supabase.from("home_hero").update({
          main_title: hero.main_title,
          description: hero.description,
          video_url: hero.video_url
        }).eq("id", hero.id);
        if (error) throw error;
      } else {
        // Insert new hero (don't include id field)
        const { error } = await supabase.from("home_hero").insert([{
          main_title: hero.main_title,
          description: hero.description,
          video_url: hero.video_url
        }]);
        if (error) throw error;
      }
      
      toast.success("Hero section saved successfully");
      fetchHero();
    } catch (error: any) {
      console.error("Hero save error:", error);
      toast.error("Failed to save hero section: " + error.message);
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
          <Label htmlFor="main_title">Main Title</Label>
          <Input
            id="main_title"
            value={hero?.main_title || ""}
            onChange={(e) => setHero(prev => prev ? { ...prev, main_title: e.target.value } : {
              id: "", main_title: e.target.value, description: "", video_url: null
            })}
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Example: We Present your Achievement to the &lt;span className="text-red-500"&gt;World&lt;/span&gt;
          </p>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={hero?.description || ""}
            onChange={(e) => setHero(prev => prev ? { ...prev, description: e.target.value } : {
              id: "", main_title: "", description: e.target.value, video_url: null
            })}
            className="min-h-[120px] w-full"
          />
        </div>

        <div>
          <Label htmlFor="video_upload">Upload Video</Label>
          <Input
            id="video_upload"
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            disabled={uploadingVideo}
          />
          {uploadingVideo && <p className="text-sm text-gray-500 mt-1">Uploading video...</p>}
          {hero?.video_url && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-2">Current video:</p>
              <video
                src={hero.video_url}
                controls
                className="w-full max-w-md rounded"
              />
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="video_url">Or enter Video URL (YouTube embed or direct video URL)</Label>
          <Input
            id="video_url"
            placeholder="https://www.youtube.com/embed/... or video file URL"
            value={hero?.video_url || ""}
            onChange={(e) => setHero(prev => prev ? { ...prev, video_url: e.target.value } : {
              id: "", main_title: "", description: "", video_url: e.target.value
            })}
          />
          <p className="text-xs text-muted-foreground mt-1">
            For YouTube: Use embed URL format (e.g., https://www.youtube.com/embed/VIDEO_ID)
          </p>
        </div>

        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>
      </form>
    </div>
  );
}
