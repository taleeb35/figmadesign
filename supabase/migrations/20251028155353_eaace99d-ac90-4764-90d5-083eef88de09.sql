-- Create content_categories table
CREATE TABLE IF NOT EXISTS public.content_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.content_categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies for content_categories
CREATE POLICY "Anyone can view content categories"
  ON public.content_categories
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert content categories"
  ON public.content_categories
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update content categories"
  ON public.content_categories
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete content categories"
  ON public.content_categories
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Add category_id to content_items
ALTER TABLE public.content_items 
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.content_categories(id) ON DELETE SET NULL;

-- Add updated_at trigger for content_categories
CREATE TRIGGER update_content_categories_updated_at
  BEFORE UPDATE ON public.content_categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();