-- Create statistics_categories table
CREATE TABLE public.statistics_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.statistics_categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies for statistics_categories
CREATE POLICY "Anyone can view statistics categories"
ON public.statistics_categories
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert statistics categories"
ON public.statistics_categories
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update statistics categories"
ON public.statistics_categories
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete statistics categories"
ON public.statistics_categories
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create statistics table
CREATE TABLE public.statistics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  image_url TEXT,
  external_link TEXT,
  category_id UUID REFERENCES public.statistics_categories(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID
);

-- Enable RLS
ALTER TABLE public.statistics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for statistics
CREATE POLICY "Anyone can view statistics"
ON public.statistics
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert statistics"
ON public.statistics
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update statistics"
ON public.statistics
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete statistics"
ON public.statistics
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add triggers for updated_at
CREATE TRIGGER update_statistics_categories_updated_at
BEFORE UPDATE ON public.statistics_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_statistics_updated_at
BEFORE UPDATE ON public.statistics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();