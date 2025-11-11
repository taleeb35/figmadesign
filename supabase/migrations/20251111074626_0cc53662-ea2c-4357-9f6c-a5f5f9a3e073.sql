-- Add status column to inquiries table
ALTER TABLE public.inquiries 
ADD COLUMN status text NOT NULL DEFAULT 'Pending';

-- Create an index for better query performance
CREATE INDEX idx_inquiries_status ON public.inquiries(status);

-- Add RLS policy for admins to update inquiry status
CREATE POLICY "Admins can update inquiry status"
ON public.inquiries
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));