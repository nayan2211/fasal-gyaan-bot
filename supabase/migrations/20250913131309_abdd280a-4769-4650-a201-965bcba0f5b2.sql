-- Create user profiles table for farmer information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone_number TEXT,
  land_size DECIMAL(10,2), -- in acres
  location TEXT,
  irrigation_type TEXT CHECK (irrigation_type IN ('drip', 'sprinkler', 'flood', 'rain_fed')),
  language_preference TEXT DEFAULT 'en' CHECK (language_preference IN ('en', 'hi', 'gu', 'mr', 'ta', 'te')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create farm_data table for soil and crop information
CREATE TABLE public.farm_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  soil_type TEXT CHECK (soil_type IN ('clay', 'sandy', 'loam', 'black_cotton', 'red', 'alluvial')),
  ph_level DECIMAL(3,1),
  nitrogen_level TEXT CHECK (nitrogen_level IN ('low', 'medium', 'high')),
  phosphorus_level TEXT CHECK (phosphorus_level IN ('low', 'medium', 'high')),
  potassium_level TEXT CHECK (potassium_level IN ('low', 'medium', 'high')),
  organic_matter DECIMAL(4,2), -- percentage
  previous_crops TEXT[], -- array of previous crop names
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for farm_data
ALTER TABLE public.farm_data ENABLE ROW LEVEL SECURITY;

-- Create policies for farm_data
CREATE POLICY "Users can manage their own farm data" 
ON public.farm_data 
FOR ALL 
USING (auth.uid() = user_id);

-- Create crop_recommendations table
CREATE TABLE public.crop_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  crop_name TEXT NOT NULL,
  crop_variety TEXT,
  expected_yield DECIMAL(10,2), -- in quintals per acre
  profit_margin DECIMAL(10,2), -- in percentage
  sustainability_score INTEGER CHECK (sustainability_score >= 1 AND sustainability_score <= 5),
  recommendation_reason TEXT,
  season TEXT CHECK (season IN ('kharif', 'rabi', 'zaid')),
  sowing_date DATE,
  harvesting_date DATE,
  water_requirement TEXT CHECK (water_requirement IN ('low', 'medium', 'high')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for crop_recommendations
ALTER TABLE public.crop_recommendations ENABLE ROW LEVEL SECURITY;

-- Create policy for crop_recommendations
CREATE POLICY "Users can view their own recommendations" 
ON public.crop_recommendations 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_farm_data_updated_at
  BEFORE UPDATE ON public.farm_data
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, phone_number)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data ->> 'name', ''),
    COALESCE(new.phone, '')
  );
  RETURN new;
END;
$$;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();