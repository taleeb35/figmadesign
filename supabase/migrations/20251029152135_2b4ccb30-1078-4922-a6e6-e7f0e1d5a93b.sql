-- Drop the overcomplicated statistics table and recreate it simple
DROP TABLE IF EXISTS public.statistics CASCADE;

-- Create simplified statistics table with only 4 fields
CREATE TABLE public.statistics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  external_link TEXT NOT NULL,
  category_id UUID REFERENCES public.content_categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.statistics ENABLE ROW LEVEL SECURITY;

-- Create policies
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

-- Add trigger for updated_at
CREATE TRIGGER update_statistics_updated_at
  BEFORE UPDATE ON public.statistics
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();