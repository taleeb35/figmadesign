import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type StatisticsCategory = {
  id: string;
  name: string;
};

type StatisticsCategoryListProps = {
  onEdit: (id: string) => void;
  refreshTrigger: number;
};

const StatisticsCategoryList = ({ onEdit, refreshTrigger }: StatisticsCategoryListProps) => {
  const [categories, setCategories] = useState<StatisticsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, [refreshTrigger]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("statistics_categories")
        .select("*")
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const { error } = await supabase
        .from("statistics_categories")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Category deleted successfully",
      });

      fetchCategories();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistics Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between p-3 border rounded">
              <span>{category.name}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(category.id)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(category.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
          {categories.length === 0 && (
            <p className="text-muted-foreground text-center py-4">No categories yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticsCategoryList;
