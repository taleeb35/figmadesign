import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import StatisticsForm from "./StatisticsForm";
import StatisticsList from "./StatisticsList";

export type StatisticItem = {
  id: string;
  title: string;
  year: number;
  image_url: string;
  external_link: string;
  category_id?: string;
  category_name?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
};

const StatisticsManager = () => {
  const [items, setItems] = useState<StatisticItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<StatisticItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from("statistics")
        .select(`
          *,
          content_categories (
            name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const itemsWithCategories = (data || []).map(item => ({
        ...item,
        category_name: item.content_categories?.name
      }));

      setItems(itemsWithCategories);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch statistics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this statistic?")) return;

    try {
      const { error } = await supabase
        .from("statistics")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Statistic deleted successfully",
      });

      fetchItems();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete statistic",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: StatisticItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setEditingItem(null);
    setShowForm(false);
    fetchItems();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Statistics Items</h2>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Statistic
          </Button>
        )}
      </div>

      {showForm ? (
        <StatisticsForm item={editingItem} onClose={handleCloseForm} />
      ) : (
        <StatisticsList 
          items={items} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default StatisticsManager;
