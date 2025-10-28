import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

type Statistic = {
  id: string;
  title: string;
  year: number;
  external_link?: string;
  image_url?: string;
  category_id?: string;
  category_name?: string;
};

type StatisticsListProps = {
  onEdit: (id: string) => void;
  refreshTrigger: number;
};

const StatisticsList = ({ onEdit, refreshTrigger }: StatisticsListProps) => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchStatistics();
  }, [refreshTrigger]);

  const fetchStatistics = async () => {
    try {
      const { data, error } = await supabase
        .from("statistics")
        .select(`
          *,
          statistics_categories (
            name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const statisticsWithCategories = (data || []).map(item => ({
        ...item,
        category_name: item.statistics_categories?.name
      }));

      setStatistics(statisticsWithCategories);
    } catch (error) {
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

      fetchStatistics();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete statistic",
        variant: "destructive",
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistics List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Link</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {statistics.map((stat) => (
              <TableRow key={stat.id}>
                <TableCell>
                  {stat.image_url && (
                    <img src={stat.image_url} alt={stat.title} className="w-16 h-16 object-cover rounded" />
                  )}
                </TableCell>
                <TableCell>{stat.title}</TableCell>
                <TableCell>{stat.year}</TableCell>
                <TableCell>{stat.category_name || "-"}</TableCell>
                <TableCell>
                  {stat.external_link && (
                    <a href={stat.external_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      View
                    </a>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(stat.id)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(stat.id)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {statistics.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No statistics yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StatisticsList;
