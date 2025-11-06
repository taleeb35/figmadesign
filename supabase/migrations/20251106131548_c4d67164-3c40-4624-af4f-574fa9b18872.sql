-- Home Page Tables

-- Home Hero Section
CREATE TABLE public.home_hero (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  main_title text NOT NULL,
  subtitle text NOT NULL,
  description text NOT NULL,
  cta_button_text text NOT NULL DEFAULT 'View our reports',
  cta_button_link text NOT NULL DEFAULT '/reports',
  background_image_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Home Statistics (Hero section stats)
CREATE TABLE public.home_statistics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  value text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Portfolio/Work Items
CREATE TABLE public.portfolio_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  external_link text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Timeline Items
CREATE TABLE public.timeline_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  year integer NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Client Logos
CREATE TABLE public.client_logos (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  logo_url text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- About Us Page Tables

-- About Us Hero
CREATE TABLE public.about_hero (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subtitle text NOT NULL,
  main_title text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- About Experience Section
CREATE TABLE public.about_experience (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  years_text text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  stat1_value text NOT NULL,
  stat1_label text NOT NULL,
  stat2_value text NOT NULL,
  stat2_label text NOT NULL,
  stat3_value text NOT NULL,
  stat3_label text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- About Advantage Section
CREATE TABLE public.about_advantage (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Company Values
CREATE TABLE public.company_values (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  icon_name text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Testimonials
CREATE TABLE public.testimonials (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote text NOT NULL,
  author_name text NOT NULL,
  author_position text NOT NULL,
  author_image_url text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE public.home_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_logos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_advantage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Home Page Tables
CREATE POLICY "Anyone can view home hero" ON public.home_hero FOR SELECT USING (true);
CREATE POLICY "Admins can manage home hero" ON public.home_hero FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view home statistics" ON public.home_statistics FOR SELECT USING (true);
CREATE POLICY "Admins can manage home statistics" ON public.home_statistics FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view portfolio items" ON public.portfolio_items FOR SELECT USING (true);
CREATE POLICY "Admins can manage portfolio items" ON public.portfolio_items FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view timeline items" ON public.timeline_items FOR SELECT USING (true);
CREATE POLICY "Admins can manage timeline items" ON public.timeline_items FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view client logos" ON public.client_logos FOR SELECT USING (true);
CREATE POLICY "Admins can manage client logos" ON public.client_logos FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for About Us Page Tables
CREATE POLICY "Anyone can view about hero" ON public.about_hero FOR SELECT USING (true);
CREATE POLICY "Admins can manage about hero" ON public.about_hero FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view about experience" ON public.about_experience FOR SELECT USING (true);
CREATE POLICY "Admins can manage about experience" ON public.about_experience FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view about advantage" ON public.about_advantage FOR SELECT USING (true);
CREATE POLICY "Admins can manage about advantage" ON public.about_advantage FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view company values" ON public.company_values FOR SELECT USING (true);
CREATE POLICY "Admins can manage company values" ON public.company_values FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Add triggers for updated_at
CREATE TRIGGER update_home_hero_updated_at BEFORE UPDATE ON public.home_hero FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_home_statistics_updated_at BEFORE UPDATE ON public.home_statistics FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_portfolio_items_updated_at BEFORE UPDATE ON public.portfolio_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_timeline_items_updated_at BEFORE UPDATE ON public.timeline_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_client_logos_updated_at BEFORE UPDATE ON public.client_logos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_about_hero_updated_at BEFORE UPDATE ON public.about_hero FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_about_experience_updated_at BEFORE UPDATE ON public.about_experience FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_about_advantage_updated_at BEFORE UPDATE ON public.about_advantage FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_company_values_updated_at BEFORE UPDATE ON public.company_values FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();