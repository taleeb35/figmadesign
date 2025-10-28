import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, FileText, BookOpen, Video } from "lucide-react";
import type { ContentItem } from "./ContentManager";

type ContentListProps = {
  items: ContentItem[];
  onEdit: (item: ContentItem) => void;
  onDelete: (id: string) => void;
};

const ContentList = ({ items, onEdit, onDelete }: ContentListProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4" />;
      case "flipbook":
        return <BookOpen className="h-4 w-4" />;
      case "youtube":
        return <Video className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "bg-blue-500";
      case "flipbook":
        return "bg-green-500";
      case "youtube":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getAvailableLanguages = (item: ContentItem) => {
    const languages = [];
    if (item.content_type === "pdf") {
      if (item.english_pdf_url) languages.push("EN");
      if (item.arabic_pdf_url) languages.push("AR");
    } else if (item.content_type === "flipbook") {
      if (item.english_flipbook_url) languages.push("EN");
      if (item.arabic_flipbook_url) languages.push("AR");
    }
    return languages.join(", ");
  };

  if (items.length === 0) {
    return (
      <div className="border rounded-lg p-12 text-center text-muted-foreground">
        No content items yet. Click "Add Content" to create one.
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Available Content</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Badge className={getTypeColor(item.content_type)}>
                  <span className="flex items-center gap-1">
                    {getTypeIcon(item.content_type)}
                    {item.content_type.toUpperCase()}
                  </span>
                </Badge>
              </TableCell>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.year}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {item.content_type === "pdf" && getAvailableLanguages(item)}
                {item.content_type === "flipbook" && getAvailableLanguages(item)}
                {item.content_type === "youtube" && (
                  <div className="space-y-1">
                    {item.youtube_url && <div>✓ Video URL</div>}
                    {item.cover_image_url && <div>✓ Cover Image</div>}
                  </div>
                )}
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

export default ContentList;
