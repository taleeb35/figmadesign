-- Create FAQ table
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Create policies for FAQ access
CREATE POLICY "Anyone can view FAQs" 
ON public.faqs 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert FAQs" 
ON public.faqs 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update FAQs" 
ON public.faqs 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete FAQs" 
ON public.faqs 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_faqs_updated_at
BEFORE UPDATE ON public.faqs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert the FAQ data using dollar-quoted strings
INSERT INTO public.faqs (question, answer, display_order) VALUES
($$What is the Annual Report's?$$, $$The Annual Report is the definitive statement of your yearly achievement. We design it to be your strategic harvest—a single, authoritative document that translates a year of complex work into crystal-clear visual evidence of success. It is your organization's most crucial asset for building trust with stakeholders, government entities, and the public.$$, 1),
($$How do you handle sensitive or confidential data?$$, $$Data security is our top priority. We adhere to rigorous confidentiality agreements and use secure protocols for all data transfer, analysis, and final report delivery.$$, 2),
($$How long does the annual report process take?$$, $$It depends on the project itself, we establish a clear, guaranteed project schedule upfront. Our structured process ensures efficient delivery, allowing us to meet your critical annual deadlines without sacrificing quality.$$, 3),
($$What is the typical end product? Is it digital, print, or both?$$, $$We deliver a comprehensive package: high-resolution print master files, optimized digital PDFs, and web-ready assets (infographics) tailored for your specific communication strategy along with a printed Copy.$$, 4),
($$What kind of historical data depth can you manage?$$, $$We specialize in integrating the unique complexities and formats of Gulf-region data. Our expertise covers structuring and analyzing historical records spanning over a decade (2010 to present) for maximum authoritative impact.$$, 5),
($$How do you ensure the final report reflects Company Vision?$$, $$The process is custom-built. It starts with a Strategy Session to ensure the report's entire narrative aligns perfectly with your leadership's mandate.$$, 6);