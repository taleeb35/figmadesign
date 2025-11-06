import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  external_link: string | null;
  display_order: number;
}

export function PortfolioManager() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .order("display_order");

      if (error) throw error;
      setItems(data || []);
    } catch (error: any) {
      toast.error("Failed to load portfolio items");
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

      setEditingItem(prev => prev ? { ...prev, image_url: publicUrl } : null);
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      if (editingItem.id && editingItem.id !== "") {
        const { error } = await supabase
          .from("portfolio_items")
          .update({
            title: editingItem.title,
            description: editingItem.description,
            image_url: editingItem.image_url,
            external_link: editingItem.external_link,
            display_order: Number(editingItem.display_order),
          })
          .eq("id", editingItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("portfolio_items").insert([
          {
            title: editingItem.title,
            description: editingItem.description,
            image_url: editingItem.image_url,
            external_link: editingItem.external_link,
            display_order: Number(editingItem.display_order),
          },
        ]);
        if (error) throw error;
      }

      toast.success("Portfolio item saved successfully");
      fetchItems();
      setOpen(false);
      setEditingItem(null);
    } catch (error: any) {
      console.error("Portfolio save error:", error);
      toast.error("Failed to save portfolio item: " + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
      if (error) throw error;
      toast.success("Portfolio item deleted successfully");
      fetchItems();
    } catch (error: any) {
      toast.error("Failed to delete portfolio item");
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Portfolio Items</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem({ id: "", title: "", description: "", image_url: "", external_link: "", display_order: items.length })}>
              <Plus className="h-4 w-4 mr-2" /> Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem?.id ? "Edit" : "Add"} Portfolio Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingItem?.title || ""}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, title: e.target.value } : null)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingItem?.description || ""}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, description: e.target.value } : null)}
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
                {editingItem?.image_url && (
                  <img src={editingItem.image_url} alt="Preview" className="mt-2 h-32 object-cover rounded" />
                )}
              </div>
              <div>
                <Label htmlFor="external_link">External Link</Label>
                <Input
                  id="external_link"
                  value={editingItem?.external_link || ""}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, external_link: e.target.value } : null)}
                />
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={editingItem?.display_order || 0}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, display_order: parseInt(e.target.value) } : null)}
                  required
                />
              </div>
              <Button type="submit">Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="border rounded overflow-hidden">
            <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <p className="text-xs text-muted-foreground mt-2">Order: {item.display_order}</p>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingItem(item);
                    setOpen(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}