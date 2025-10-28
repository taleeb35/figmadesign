import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ContentCategoryForm from "./ContentCategoryForm";
import ContentCategoryList from "./ContentCategoryList";

// Content category management component

export type ContentCategory = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

const ContentCategoryManager = () => {
  const [categories, setCategories] = useState<ContentCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ContentCategory | null>(null);
  const { toast } = useToast();

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("content_categories")
        .select("*")
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (category: ContentCategory) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const { error } = await supabase
        .from("content_categories")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
      fetchCategories();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCategory(null);
    fetchCategories();
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Categories</h2>
        <Button onClick={() => setShowForm(true)}>Add Category</Button>
      </div>

      {showForm && (
        <ContentCategoryForm category={editingCategory} onClose={handleFormClose} />
      )}

      <ContentCategoryList
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ContentCategoryManager;
