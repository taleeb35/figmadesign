import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Testimonial {
  id: string;
  quote: string;
  author_name: string;
  author_position: string;
  author_image_url: string | null;
  display_order: number;
}

export function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("display_order");

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error: any) {
      toast.error("Failed to load testimonials");
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

      setEditingTestimonial(prev => prev ? { ...prev, author_image_url: publicUrl } : null);
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingTestimonial) return;

    try {
      const { error } = editingTestimonial.id
        ? await supabase.from("testimonials").update(editingTestimonial).eq("id", editingTestimonial.id)
        : await supabase.from("testimonials").insert([editingTestimonial]);

      if (error) throw error;
      toast.success("Testimonial saved successfully");
      fetchTestimonials();
      setOpen(false);
      setEditingTestimonial(null);
    } catch (error: any) {
      toast.error("Failed to save testimonial");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
      toast.success("Testimonial deleted successfully");
      fetchTestimonials();
    } catch (error: any) {
      toast.error("Failed to delete testimonial");
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Testimonials</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingTestimonial({ id: "", quote: "", author_name: "", author_position: "", author_image_url: null, display_order: testimonials.length })}>
              <Plus className="h-4 w-4 mr-2" /> Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingTestimonial?.id ? "Edit" : "Add"} Testimonial</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="quote">Quote</Label>
                <Textarea
                  id="quote"
                  value={editingTestimonial?.quote || ""}
                  onChange={(e) => setEditingTestimonial(prev => prev ? { ...prev, quote: e.target.value } : null)}
                  required
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="author_name">Author Name</Label>
                <Input
                  id="author_name"
                  value={editingTestimonial?.author_name || ""}
                  onChange={(e) => setEditingTestimonial(prev => prev ? { ...prev, author_name: e.target.value } : null)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="author_position">Author Position</Label>
                <Input
                  id="author_position"
                  value={editingTestimonial?.author_position || ""}
                  onChange={(e) => setEditingTestimonial(prev => prev ? { ...prev, author_position: e.target.value } : null)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="author_image">Author Image (optional)</Label>
                <Input
                  id="author_image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {editingTestimonial?.author_image_url && (
                  <img src={editingTestimonial.author_image_url} alt="Author" className="mt-2 h-20 w-20 object-cover rounded-full" />
                )}
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={editingTestimonial?.display_order || 0}
                  onChange={(e) => setEditingTestimonial(prev => prev ? { ...prev, display_order: parseInt(e.target.value) } : null)}
                  required
                />
              </div>
              <Button type="submit">Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="border rounded p-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4 flex-1">
                {testimonial.author_image_url && (
                  <img
                    src={testimonial.author_image_url}
                    alt={testimonial.author_name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author_name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.author_position}</p>
                    <p className="text-xs text-muted-foreground mt-2">Order: {testimonial.display_order}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setEditingTestimonial(testimonial);
                    setOpen(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(testimonial.id)}>
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