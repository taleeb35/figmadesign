-- Create infographics table
CREATE TABLE public.infographics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID
);

-- Enable Row Level Security
ALTER TABLE public.infographics ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view infographics"
ON public.infographics
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert infographics"
ON public.infographics
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update infographics"
ON public.infographics
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete infographics"
ON public.infographics
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_infographics_updated_at
BEFORE UPDATE ON public.infographics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();