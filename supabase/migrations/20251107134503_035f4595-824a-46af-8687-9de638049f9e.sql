-- Create footer settings table
CREATE TABLE public.footer_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  description text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  address text NOT NULL,
  linkedin_url text,
  facebook_url text,
  instagram_url text,
  youtube_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.footer_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view footer settings"
  ON public.footer_settings
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage footer settings"
  ON public.footer_settings
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_footer_settings_updated_at
  BEFORE UPDATE ON public.footer_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default data
INSERT INTO public.footer_settings (description, phone, email, address, linkedin_url, facebook_url, instagram_url, youtube_url)
VALUES (
  'The Annual Reports, Bespoke data analysis and visual reports for Gulf area governments and corporations since 2010.',
  '+971856784543',
  'info@annualreport.net',
  'JLT, Dubai, 123 adress street',
  '#',
  '#',
  '#',
  '#'
);