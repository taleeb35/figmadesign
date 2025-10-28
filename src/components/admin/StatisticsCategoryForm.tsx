import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type StatisticsCategoryFormProps = {
  categoryId: string | null;
  onSuccess: () => void;
  onCancel: () => void;
};

const StatisticsCategoryForm = ({ categoryId, onSuccess, onCancel }: StatisticsCategoryFormProps) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (categoryId) {
      fetchCategory();
    } else {
      setName("");
    }
  }, [categoryId]);

  const fetchCategory = async () => {
    if (!categoryId) return;

    const { data, error } = await supabase
      .from("statistics_categories")
      .select("*")
      .eq("id", categoryId)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch category",
        variant: "destructive",
      });
      return;
    }

    setName(data.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (categoryId) {
        const { error } = await supabase
          .from("statistics_categories")
          .update({ name })
          .eq("id", categoryId);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Category updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("statistics_categories")
          .insert({ name });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Category created successfully",
        });
      }

      setName("");
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save category",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{categoryId ? "Edit" : "Add"} Statistics Category</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : categoryId ? "Update" : "Add"} Category
            </Button>
            {categoryId && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default StatisticsCategoryForm;
