import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type FAQ = {
  id: string;
  question: string;
  answer: string;
  display_order: number;
};

type FAQFormProps = {
  item: FAQ | null;
  onClose: () => void;
};

export function FAQForm({ item, onClose }: FAQFormProps) {
  const { toast } = useToast();
  const [question, setQuestion] = useState(item?.question || "");
  const [answer, setAnswer] = useState(item?.answer || "");
  const [displayOrder, setDisplayOrder] = useState(item?.display_order || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (item) {
        const { error } = await supabase
          .from("faqs")
          .update({
            question,
            answer,
            display_order: displayOrder,
          })
          .eq("id", item.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "FAQ updated successfully",
        });
      } else {
        const { error } = await supabase.from("faqs").insert({
          question,
          answer,
          display_order: displayOrder,
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "FAQ created successfully",
        });
      }

      onClose();
    } catch (error) {
      console.error("Error saving FAQ:", error);
      toast({
        title: "Error",
        description: "Failed to save FAQ",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="question">Question</Label>
        <Input
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter question"
          required
        />
      </div>

      <div>
        <Label htmlFor="answer">Answer</Label>
        <Textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter answer"
          rows={6}
          required
        />
      </div>

      <div>
        <Label htmlFor="displayOrder">Display Order</Label>
        <Input
          id="displayOrder"
          type="number"
          value={displayOrder}
          onChange={(e) => setDisplayOrder(parseInt(e.target.value))}
          placeholder="Enter display order"
          required
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : item ? "Update FAQ" : "Create FAQ"}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
