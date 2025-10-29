import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import InfographicsForm from "./InfographicsForm";
import InfographicsList from "./InfographicsList";

type Infographic = {
  id: string;
  title: string;
  image_url: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
};

const InfographicsManager = () => {
  const [items, setItems] = useState<Infographic[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Infographic | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from("infographics")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setItems(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch infographics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this infographic?")) return;

    try {
      const { error } = await supabase
        .from("infographics")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Infographic deleted successfully",
      });

      fetchItems();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete infographic",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      setEditingItem(item);
      setShowForm(true);
    }
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
        <h2 className="text-2xl font-bold">Infographics Items</h2>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Infographic
          </Button>
        )}
      </div>

      {showForm ? (
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingItem ? "Edit" : "Add"} Infographic
          </h3>
          <InfographicsForm
            infographicId={editingItem?.id || null}
            onSuccess={handleCloseForm}
            onCancel={handleCloseForm}
          />
        </div>
      ) : (
        <InfographicsList 
          items={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default InfographicsManager;
