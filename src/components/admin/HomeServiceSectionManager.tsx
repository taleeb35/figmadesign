import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface HomeServiceSection {
  id: string;
  title: string;
  subtitle: string;
  video_url: string | null;
}

export function HomeServiceSectionManager() {
  const [section, setSection] = useState<HomeServiceSection>({
    id: "",
    title: "",
    subtitle: "",
    video_url: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    try {
      const { data, error } = await supabase
        .from("home_service_section" as any)
        .select("*")
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setSection(data as unknown as HomeServiceSection);
      }
    } catch (error) {
      console.error("Error loading service section:", error);
      toast.error("Failed to load service section");
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
      const filePath = `service-videos/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("content-files")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("content-files").getPublicUrl(filePath);

      setSection({ ...section, video_url: publicUrl });
      toast.success("Video uploaded successfully");
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Failed to upload video");
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (section.id) {
        const { error } = await supabase
          .from("home_service_section" as any)
          .update({
            title: section.title,
            subtitle: section.subtitle,
            video_url: section.video_url,
            updated_at: new Date().toISOString(),
          })
          .eq("id", section.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("home_service_section" as any)
          .insert({
            title: section.title,
            subtitle: section.subtitle,
            video_url: section.video_url,
          })
          .select()
          .single();

        if (error) throw error;
        if (data) setSection(data as unknown as HomeServiceSection);
      }

      toast.success("Service section saved successfully");
      await fetchSection();
    } catch (error) {
      console.error("Error saving service section:", error);
      toast.error("Failed to save service section");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Service Section Content</h2>
        <p className="text-muted-foreground">
          Manage the service section on the home page
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={section.title}
            onChange={(e) => setSection({ ...section, title: e.target.value })}
            placeholder="Introducing the Annual report's Service"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Textarea
            id="subtitle"
            value={section.subtitle}
            onChange={(e) =>
              setSection({ ...section, subtitle: e.target.value })
            }
            placeholder="See the Process: From Data Complexity to Executive Clarity."
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="video-upload">Upload Video</Label>
          <Input
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            disabled={uploadingVideo}
          />
          {uploadingVideo && (
            <p className="text-sm text-muted-foreground">Uploading video...</p>
          )}
        </div>

        

        {section.video_url && (
          <div className="space-y-2">
            <Label>Video Preview</Label>
            <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden bg-muted">
              {section.video_url.includes("youtube.com") ||
              section.video_url.includes("youtu.be") ? (
                <iframe
                  src={section.video_url}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={section.video_url}
                  controls
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        )}

        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Service Section
        </Button>
      </form>
    </div>
  );
}
