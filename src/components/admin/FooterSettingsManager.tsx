import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface FooterSettings {
  id: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  linkedin_url: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
}

export default function FooterSettingsManager() {
  const [settings, setSettings] = useState<FooterSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FooterSettings>();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("footer_settings")
      .select("*")
      .single();

    if (error) {
      toast.error("Failed to load footer settings");
      return;
    }

    setSettings(data);
    reset(data);
  };

  const onSubmit = async (data: FooterSettings) => {
    setLoading(true);
    const { error } = await supabase
      .from("footer_settings")
      .update({
        description: data.description,
        phone: data.phone,
        email: data.email,
        address: data.address,
        linkedin_url: data.linkedin_url || null,
        facebook_url: data.facebook_url || null,
        instagram_url: data.instagram_url || null,
        youtube_url: data.youtube_url || null,
      })
      .eq("id", settings?.id);

    setLoading(false);

    if (error) {
      toast.error("Failed to update footer settings");
      return;
    }

    toast.success("Footer settings updated successfully");
    fetchSettings();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Footer Settings</h2>
        <p className="text-muted-foreground">
          Manage footer content and contact information
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">Footer Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Footer description text"
            className="min-h-[100px] w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number (UAE)</Label>
            <Input
              id="phone"
              {...register("phoneuae")}
              placeholder="+971856784543"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number (KSA)</Label>
            <Input
              id="phone"
              {...register("phoneksa")}
              placeholder="+971856784543"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="info@annualreport.net"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            {...register("address")}
            placeholder="JLT, Dubai, 123 address street"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Social Media Links</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input
                id="linkedin_url"
                {...register("linkedin_url")}
                placeholder="https://linkedin.com/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="facebook_url">Facebook URL</Label>
              <Input
                id="facebook_url"
                {...register("facebook_url")}
                placeholder="https://facebook.com/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram_url">Instagram URL</Label>
              <Input
                id="instagram_url"
                {...register("instagram_url")}
                placeholder="https://instagram.com/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtube_url">YouTube URL</Label>
              <Input
                id="youtube_url"
                {...register("youtube_url")}
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Footer Settings
        </Button>
      </form>
    </div>
  );
}
