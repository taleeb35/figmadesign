import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          No content items yet. Click "Add Content" to create one.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-3">
              <Badge className={getTypeColor(item.content_type)}>
                <span className="flex items-center gap-1">
                  {getTypeIcon(item.content_type)}
                  {item.content_type.toUpperCase()}
                </span>
              </Badge>
              <span className="text-sm text-muted-foreground">{item.year}</span>
            </div>
            
            <h3 className="font-semibold mb-4 line-clamp-2">{item.title}</h3>
            
            <div className="text-sm text-muted-foreground mb-4">
              {item.content_type === "pdf" && (
                <div className="space-y-1">
                  {item.english_pdf_url && <div>✓ English PDF</div>}
                  {item.arabic_pdf_url && <div>✓ Arabic PDF</div>}
                </div>
              )}
              {item.content_type === "flipbook" && (
                <div className="space-y-1">
                  {item.english_flipbook_url && <div>✓ English Link</div>}
                  {item.arabic_flipbook_url && <div>✓ Arabic Link</div>}
                </div>
              )}
              {item.content_type === "youtube" && (
                <div className="space-y-1">
                  {item.youtube_url && <div>✓ Video URL</div>}
                  {item.cover_image_url && <div>✓ Cover Image</div>}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(item)}
                className="flex-1"
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContentList;
