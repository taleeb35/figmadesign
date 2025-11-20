import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ClientLogo {
  id: string;
  name: string;
  logo_url: string;
  display_order: number;
}

export function ClientLogosManager() {
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLogo, setEditingLogo] = useState<ClientLogo | null>(null);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const { data, error } = await supabase
        .from("client_logos")
        .select("*")
        .order("display_order");

      if (error) throw error;
      setLogos(data || []);
    } catch (error: any) {
      toast.error("Failed to load client logos");
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
      const { error: uploadError } = await supabase.storage
        .from("content-files")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("content-files")
        .getPublicUrl(fileName);

      setEditingLogo(prev => prev ? { ...prev, logo_url: publicUrl } : null);
      toast.success("Logo uploaded successfully");
    } catch (error: any) {
      toast.error("Failed to upload logo");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingLogo) return;

    try {
      if (editingLogo.id && editingLogo.id !== "") {
        // Update existing logo
        const { error } = await supabase.from("client_logos").update({
          name: editingLogo.name,
          logo_url: editingLogo.logo_url,
          display_order: editingLogo.display_order
        }).eq("id", editingLogo.id);
        if (error) throw error;
      } else {
        // Insert new logo (don't include id field)
        const { error } = await supabase.from("client_logos").insert([{
          name: editingLogo.name,
          logo_url: editingLogo.logo_url,
          display_order: editingLogo.display_order
        }]);
        if (error) throw error;
      }
      
      toast.success("Client logo saved successfully");
      fetchLogos();
      setOpen(false);
      setEditingLogo(null);
    } catch (error: any) {
      console.error("Logo save error:", error);
      toast.error("Failed to save client logo: " + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      const { error } = await supabase.from("client_logos").delete().eq("id", id);
      if (error) throw error;
      toast.success("Client logo deleted successfully");
      fetchLogos();
    } catch (error: any) {
      toast.error("Failed to delete client logo");
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Client Logos</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingLogo({ id: "", name: "", logo_url: "", display_order: logos.length })}>
              <Plus className="h-4 w-4 mr-2" /> Add Logo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingLogo?.id ? "Edit" : "Add"} Client Logo</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Client Name</Label>
                <Input
                  id="name"
                  value={editingLogo?.name || ""}
                  onChange={(e) => setEditingLogo(prev => prev ? { ...prev, name: e.target.value } : null)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="logo">Logo Image</Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {editingLogo?.logo_url && (
                  <img src={editingLogo.logo_url} alt="Logo" className="mt-2 h-20 object-contain bg-gray-100 p-2 rounded" />
                )}
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={editingLogo?.display_order || 0}
                  onChange={(e) => setEditingLogo(prev => prev ? { ...prev, display_order: parseInt(e.target.value) } : null)}
                  required
                />
              </div>
              <Button type="submit">Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {logos.map((logo) => (
          <div key={logo.id} className="border rounded p-4 space-y-2">
            <img src={logo.logo_url} alt={logo.name} className="w-full h-20 object-contain bg-gray-50 rounded clint_logogs" />
            <p className="text-sm font-medium text-center">{logo.name}</p>
            <p className="text-xs text-muted-foreground text-center">Order: {logo.display_order}</p>
            <div className="flex gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingLogo(logo);
                  setOpen(true);
                }}
              >
                <Edit className="h-3 w-3" />
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(logo.id)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
