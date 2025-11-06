import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface HomeStat {
  id: string;
  title: string;
  value: string;
  display_order: number;
}

export function HomeStatisticsManager() {
  const [stats, setStats] = useState<HomeStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStat, setEditingStat] = useState<HomeStat | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from("home_statistics")
        .select("*")
        .order("display_order");

      if (error) throw error;
      setStats(data || []);
    } catch (error: any) {
      toast.error("Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingStat) return;

    try {
      if (editingStat.id && editingStat.id !== "") {
        const { error } = await supabase
          .from("home_statistics")
          .update({
            title: editingStat.title,
            value: editingStat.value,
            display_order: Number(editingStat.display_order),
          })
          .eq("id", editingStat.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("home_statistics").insert([
          {
            title: editingStat.title,
            value: editingStat.value,
            display_order: Number(editingStat.display_order),
          },
        ]);
        if (error) throw error;
      }

      toast.success("Statistic saved successfully");
      fetchStats();
      setOpen(false);
      setEditingStat(null);
    } catch (error: any) {
      console.error("Home statistics save error:", error);
      toast.error("Failed to save statistic: " + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this statistic?")) return;

    try {
      const { error } = await supabase.from("home_statistics").delete().eq("id", id);
      if (error) throw error;
      toast.success("Statistic deleted successfully");
      fetchStats();
    } catch (error: any) {
      toast.error("Failed to delete statistic");
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Home Page Statistics</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingStat({ id: "", title: "", value: "", display_order: stats.length })}>
              <Plus className="h-4 w-4 mr-2" /> Add Statistic
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingStat?.id ? "Edit" : "Add"} Statistic</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingStat?.title || ""}
                  onChange={(e) => setEditingStat(prev => prev ? { ...prev, title: e.target.value } : null)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  value={editingStat?.value || ""}
                  onChange={(e) => setEditingStat(prev => prev ? { ...prev, value: e.target.value } : null)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={editingStat?.display_order || 0}
                  onChange={(e) => setEditingStat(prev => prev ? { ...prev, display_order: parseInt(e.target.value) } : null)}
                  required
                />
              </div>
              <Button type="submit">Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="flex items-center justify-between p-4 border rounded">
            <div>
              <h3 className="font-semibold">{stat.title}</h3>
              <p className="text-2xl text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">Order: {stat.display_order}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setEditingStat(stat);
                  setOpen(true);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="icon" onClick={() => handleDelete(stat.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}