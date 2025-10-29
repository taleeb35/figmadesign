import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, ExternalLink } from "lucide-react";
import type { StatisticItem } from "./StatisticsManager";

type StatisticsListProps = {
  items: StatisticItem[];
  onEdit: (item: StatisticItem) => void;
  onDelete: (id: string) => void;
};

const StatisticsList = ({ items, onEdit, onDelete }: StatisticsListProps) => {

  if (items.length === 0) {
    return (
      <div className="border rounded-lg p-12 text-center text-muted-foreground">
        No statistics yet. Click "Add Statistic" to create one.
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Content Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.year}</TableCell>
              <TableCell>
                <a 
                  href={item.external_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  View
                </a>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {item.category_name || "N/A"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(item)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(item.id)}
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

export default StatisticsList;
