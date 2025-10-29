import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

type Infographic = {
  id: string;
  title: string;
  image_url: string;
};

type InfographicsListProps = {
  onEdit: (id: string) => void;
  refreshTrigger: number;
};

const InfographicsList = ({ onEdit, refreshTrigger }: InfographicsListProps) => {
  const [infographics, setInfographics] = useState<Infographic[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchInfographics();
  }, [refreshTrigger]);

  const fetchInfographics = async () => {
    try {
      const { data, error } = await supabase
        .from("infographics")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setInfographics(data || []);
    } catch (error) {
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

      fetchInfographics();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete infographic",
        variant: "destructive",
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Infographics List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {infographics.map((infographic) => (
              <TableRow key={infographic.id}>
                <TableCell>
                  <img src={infographic.image_url} alt={infographic.title} className="w-16 h-16 object-cover rounded" />
                </TableCell>
                <TableCell>{infographic.title}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(infographic.id)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(infographic.id)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {infographics.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  No infographics yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default InfographicsList;
