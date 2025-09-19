import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User, MapPin, Phone, Droplets, Ruler, Globe } from 'lucide-react';

interface ProfileData {
  name: string;
  phone_number: string;
  land_size: number;
  location: string;
  irrigation_type: string;
  language_preference: string;
}

interface FarmData {
  soil_type: string;
  ph_level: number;
  nitrogen_level: string;
  phosphorus_level: string;
  potassium_level: string;
  organic_matter: number;
  previous_crops: string[];
  latitude: number;
  longitude: number;
}

export const FarmerProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    phone_number: '',
    land_size: 0,
    location: '',
    irrigation_type: '',
    language_preference: 'hi'
  });
  const [farmData, setFarmData] = useState<FarmData>({
    soil_type: '',
    ph_level: 7.0,
    nitrogen_level: 'medium',
    phosphorus_level: 'medium',
    potassium_level: 'medium',
    organic_matter: 2.5,
    previous_crops: [],
    latitude: 0,
    longitude: 0
  });
  const [newCrop, setNewCrop] = useState('');

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchFarmData();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile({
          name: data.name || '',
          phone_number: data.phone_number || '',
          land_size: data.land_size || 0,
          location: data.location || '',
          irrigation_type: data.irrigation_type || '',
          language_preference: data.language_preference || 'hi'
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchFarmData = async () => {
    try {
      const { data, error } = await supabase
        .from('farm_data')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setFarmData(data);
      }
    } catch (error) {
      console.error('Error fetching farm data:', error);
    }
  };

  const saveProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          ...profile
        });

      if (error) throw error;

      toast.success('प्रोफाइल सफलतापूर्वक अपडेट हुई / Profile updated successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('प्रोफाइल अपडेट करने में त्रुटि / Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const saveFarmData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('farm_data')
        .upsert({
          user_id: user.id,
          ...farmData
        });

      if (error) throw error;

      toast.success('खेत का डेटा सफलतापूर्वक अपडेट हुआ / Farm data updated successfully');
    } catch (error) {
      console.error('Error saving farm data:', error);
      toast.error('खेत का डेटा अपडेट करने में त्रुटि / Error updating farm data');
    } finally {
      setLoading(false);
    }
  };

  const addCrop = () => {
    if (newCrop.trim() && !farmData.previous_crops.includes(newCrop.trim())) {
      setFarmData({
        ...farmData,
        previous_crops: [...farmData.previous_crops, newCrop.trim()]
      });
      setNewCrop('');
    }
  };

  const removeCrop = (cropToRemove: string) => {
    setFarmData({
      ...farmData,
      previous_crops: farmData.previous_crops.filter(crop => crop !== cropToRemove)
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFarmData({
            ...farmData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          toast.success('स्थान सफलतापूर्वक प्राप्त हुई / Location obtained successfully');
        },
        (error) => {
          toast.error('स्थान प्राप्त करने में त्रुटि / Error getting location');
        }
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          किसान प्रोफाइल / Farmer Profile
        </h1>
        <p className="text-muted-foreground">
          अपनी जानकारी अपडेट करें / Update your information
        </p>
      </div>

      {/* Personal Information */}
      <Card className="shadow-warm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            व्यक्तिगत जानकारी / Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">नाम / Name *</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                placeholder="आपका नाम / Your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">फोन नंबर / Phone Number</Label>
              <Input
                id="phone"
                value={profile.phone_number}
                onChange={(e) => setProfile({...profile, phone_number: e.target.value})}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">स्थान / Location</Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                  placeholder="गांव, जिला, राज्य / Village, District, State"
                  className="flex-1"
                />
                <Button variant="outline" onClick={getCurrentLocation}>
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">भाषा वरीयता / Language Preference</Label>
              <Select 
                value={profile.language_preference} 
                onValueChange={(value) => setProfile({...profile, language_preference: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hi">हिंदी / Hindi</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="gu">ગુજરાતી / Gujarati</SelectItem>
                  <SelectItem value="mr">मराठी / Marathi</SelectItem>
                  <SelectItem value="ta">தமிழ் / Tamil</SelectItem>
                  <SelectItem value="te">తెలుగు / Telugu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="landSize">जमीन का आकार / Land Size (एकड़ / Acres)</Label>
              <Input
                id="landSize"
                type="number"
                step="0.1"
                value={profile.land_size}
                onChange={(e) => setProfile({...profile, land_size: Number(e.target.value)})}
                placeholder="2.5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="irrigation">सिंचाई प्रकार / Irrigation Type</Label>
              <Select 
                value={profile.irrigation_type} 
                onValueChange={(value) => setProfile({...profile, irrigation_type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="सिंचाई चुनें / Select irrigation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drip">ड्रिप / Drip</SelectItem>
                  <SelectItem value="sprinkler">स्प्रिंकलर / Sprinkler</SelectItem>
                  <SelectItem value="flood">बाढ़ / Flood</SelectItem>
                  <SelectItem value="rain_fed">बारिश आधारित / Rain-fed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={saveProfile} disabled={loading} className="w-full">
            {loading ? 'सेव हो रहा है... / Saving...' : 'प्रोफाइल सेव करें / Save Profile'}
          </Button>
        </CardContent>
      </Card>

      {/* Farm Data */}
      <Card className="shadow-warm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-earth-blue" />
            खेत की जानकारी / Farm Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="soilType">मिट्टी का प्रकार / Soil Type</Label>
              <Select 
                value={farmData.soil_type} 
                onValueChange={(value) => setFarmData({...farmData, soil_type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="मिट्टी चुनें / Select soil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clay">चिकनी मिट्टी / Clay</SelectItem>
                  <SelectItem value="sandy">रेतीली मिट्टी / Sandy</SelectItem>
                  <SelectItem value="loam">दोमट मिट्टी / Loam</SelectItem>
                  <SelectItem value="black_cotton">काली कपास मिट्टी / Black Cotton</SelectItem>
                  <SelectItem value="red">लाल मिट्टी / Red</SelectItem>
                  <SelectItem value="alluvial">जलोढ़ मिट्टी / Alluvial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phLevel">pH स्तर / pH Level</Label>
              <Input
                id="phLevel"
                type="number"
                step="0.1"
                min="0"
                max="14"
                value={farmData.ph_level}
                onChange={(e) => setFarmData({...farmData, ph_level: Number(e.target.value)})}
                placeholder="7.0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nitrogen">नाइट्रोजन स्तर / Nitrogen Level</Label>
              <Select 
                value={farmData.nitrogen_level} 
                onValueChange={(value) => setFarmData({...farmData, nitrogen_level: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">कम / Low</SelectItem>
                  <SelectItem value="medium">मध्यम / Medium</SelectItem>
                  <SelectItem value="high">उच्च / High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phosphorus">फास्फोरस स्तर / Phosphorus Level</Label>
              <Select 
                value={farmData.phosphorus_level} 
                onValueChange={(value) => setFarmData({...farmData, phosphorus_level: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">कम / Low</SelectItem>
                  <SelectItem value="medium">मध्यम / Medium</SelectItem>
                  <SelectItem value="high">उच्च / High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="potassium">पोटेशियम स्तर / Potassium Level</Label>
              <Select 
                value={farmData.potassium_level} 
                onValueChange={(value) => setFarmData({...farmData, potassium_level: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">कम / Low</SelectItem>
                  <SelectItem value="medium">मध्यम / Medium</SelectItem>
                  <SelectItem value="high">उच्च / High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="organicMatter">जैविक पदार्थ / Organic Matter (%)</Label>
            <Input
              id="organicMatter"
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={farmData.organic_matter}
              onChange={(e) => setFarmData({...farmData, organic_matter: Number(e.target.value)})}
              placeholder="2.5"
            />
          </div>

          <div className="space-y-2">
            <Label>पिछली फसलें / Previous Crops</Label>
            <div className="flex gap-2">
              <Input
                value={newCrop}
                onChange={(e) => setNewCrop(e.target.value)}
                placeholder="फसल का नाम / Crop name"
                className="flex-1"
              />
              <Button variant="outline" onClick={addCrop}>
                जोड़ें / Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {farmData.previous_crops.map((crop, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => removeCrop(crop)}
                >
                  {crop} ✕
                </Badge>
              ))}
            </div>
          </div>

          <Button onClick={saveFarmData} disabled={loading} className="w-full">
            {loading ? 'सेव हो रहा है... / Saving...' : 'खेत का डेटा सेव करें / Save Farm Data'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};