import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Edit, Heart, Lightbulb, Users, Award } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  display_order: number;
}

const iconOptions = [
  { value: "Heart", label: "Heart (Passion)", icon: Heart },
  { value: "Lightbulb", label: "Lightbulb (Innovation)", icon: Lightbulb },
  { value: "Users", label: "Users (Collaboration)", icon: Users },
  { value: "Award", label: "Award (Excellence)", icon: Award },
];

export function CompanyValuesManager() {
  const [values, setValues] = useState<CompanyValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingValue, setEditingValue] = useState<CompanyValue | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchValues();
  }, []);

  const fetchValues = async () => {
    try {
      const { data, error } = await supabase
        .from("company_values")
        .select("*")
        .order("display_order");

      if (error) throw error;
      setValues(data || []);
    } catch (error: any) {
      toast.error("Failed to load company values");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingValue) return;

    try {
      if (editingValue.id && editingValue.id !== "") {
        const { error } = await supabase
          .from("company_values")
          .update({
            title: editingValue.title,
            description: editingValue.description,
            icon_name: editingValue.icon_name,
            display_order: Number(editingValue.display_order),
          })
          .eq("id", editingValue.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("company_values").insert([
          {
            title: editingValue.title,
            description: editingValue.description,
            icon_name: editingValue.icon_name,
            display_order: Number(editingValue.display_order),
          },
        ]);
        if (error) throw error;
      }
      toast.success("Company value saved successfully");
      fetchValues();
      setOpen(false);
      setEditingValue(null);
    } catch (error: any) {
      console.error("Company value save error:", error);
      toast.error("Failed to save company value: " + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      const { error } = await supabase.from("company_values").delete().eq("id", id);
      if (error) throw error;
      toast.success("Company value deleted successfully");
      fetchValues();
    } catch (error: any) {
      toast.error("Failed to delete company value");
    }
  };

  const getIcon = (iconName: string) => {
    const iconOption = iconOptions.find(opt => opt.value === iconName);
    return iconOption ? iconOption.icon : Heart;
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Company Values</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingValue({ id: "", title: "", description: "", icon_name: "Heart", display_order: values.length })}>
              <Plus className="h-4 w-4 mr-2" /> Add Value
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingValue?.id ? "Edit" : "Add"} Company Value</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingValue?.title || ""}
                  onChange={(e) => setEditingValue(prev => prev ? { ...prev, title: e.target.value } : null)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingValue?.description || ""}
                  onChange={(e) => setEditingValue(prev => prev ? { ...prev, description: e.target.value } : null)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="icon_name">Icon</Label>
                <Select
                  value={editingValue?.icon_name || "Heart"}
                  onValueChange={(value) => setEditingValue(prev => prev ? { ...prev, icon_name: value } : null)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={editingValue?.display_order || 0}
                  onChange={(e) => setEditingValue(prev => prev ? { ...prev, display_order: parseInt(e.target.value) } : null)}
                  required
                />
              </div>
              <Button type="submit">Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {values.map((value) => {
          const Icon = getIcon(value.icon_name);
          return (
            <div key={value.id} className="border rounded p-4 space-y-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
              <p className="text-xs text-muted-foreground">Order: {value.display_order}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingValue(value);
                    setOpen(true);
                  }}
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(value.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}