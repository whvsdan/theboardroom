-- Add missing columns to registrations table for enhanced data collection
ALTER TABLE public.registrations
ADD COLUMN IF NOT EXISTS age integer,
ADD COLUMN IF NOT EXISTS gender text,
ADD COLUMN IF NOT EXISTS participant_type text,
ADD COLUMN IF NOT EXISTS workshops text;

-- Update RLS policy to allow public registration without authentication
DROP POLICY IF EXISTS "registrations_insert_own" ON public.registrations;
CREATE POLICY "registrations_insert_public" ON public.registrations 
FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "registrations_select_own" ON public.registrations;
CREATE POLICY "registrations_select_public" ON public.registrations 
FOR SELECT USING (true);
