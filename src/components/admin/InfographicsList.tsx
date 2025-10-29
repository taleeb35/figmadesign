import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
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

  if (infographics.length === 0) {
    return (
      <div className="border rounded-lg p-12 text-center text-muted-foreground">
        No infographics yet. Click "Add Infographic" to create one.
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {infographics.map((infographic) => (
            <TableRow key={infographic.id}>
              <TableCell className="font-medium">{infographic.title}</TableCell>
              <TableCell>
                <a 
                  href={infographic.image_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  View Image
                </a>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(infographic.id)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(infographic.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InfographicsList;
