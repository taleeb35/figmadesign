import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface TimelineItem {
  id: string;
  year: number;
  title: string;
  description: string;
  display_order: number;
}

export function TimelineManager() {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<TimelineItem | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from("timeline_items")
        .select("*")
        .order("display_order");

      if (error) throw error;
      setItems(data || []);
    } catch (error: any) {
      toast.error("Failed to load timeline items");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      if (editingItem.id && editingItem.id !== "") {
        // Update existing item
        const { error } = await supabase
          .from("timeline_items")
          .update({
            year: Number(editingItem.year),
            title: editingItem.title,
            description: editingItem.description,
            display_order: Number(editingItem.display_order),
          })
          .eq("id", editingItem.id);
        if (error) throw error;
      } else {
        // Insert new item (exclude id to let DB generate it)
        const { error } = await supabase.from("timeline_items").insert([
          {
            year: Number(editingItem.year),
            title: editingItem.title,
            description: editingItem.description,
            display_order: Number(editingItem.display_order),
          },
        ]);
        if (error) throw error;
      }
      toast.success("Timeline item saved successfully");
      fetchItems();
      setOpen(false);
      setEditingItem(null);
    } catch (error: any) {
      console.error("Timeline save error:", error);
      toast.error("Failed to save timeline item: " + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      const { error } = await supabase.from("timeline_items").delete().eq("id", id);
      if (error) throw error;
      toast.success("Timeline item deleted successfully");
      fetchItems();
    } catch (error: any) {
      toast.error("Failed to delete timeline item");
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Timeline Items</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem({ id: "", year: new Date().getFullYear(), title: "", description: "", display_order: items.length })}>
              <Plus className="h-4 w-4 mr-2" /> Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem?.id ? "Edit" : "Add"} Timeline Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={editingItem?.year || ""}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, year: parseInt(e.target.value) } : null)}
                  required
                />
              </div>
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
                  required
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

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start justify-between p-4 border rounded">
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-primary">{item.year}</span>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">Order: {item.display_order}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setEditingItem(item);
                  setOpen(true);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}