import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Sprout, 
  Cloud, 
  Droplets, 
  TrendingUp, 
  MessageCircle, 
  FileText,
  Settings,
  LogOut,
  Thermometer,
  Wind,
  Eye
} from 'lucide-react';

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [weatherData] = useState({
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    condition: 'Partly Cloudy',
    forecast: 'Moderate rain expected tomorrow'
  });

  const [soilData] = useState({
    ph: 6.8,
    nitrogen: 'Medium',
    phosphorus: 'High', 
    potassium: 'Medium',
    moisture: 45
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const menuItems = [
    { title: 'फसल सुझाव / Crop Recommendation', icon: Sprout, path: '/crop-recommendation', color: 'bg-earth-green' },
    { title: 'मिट्टी विश्लेषण / Soil Analysis', icon: Eye, path: '/soil-analysis', color: 'bg-earth-brown' },
    { title: 'बाजार मूल्य / Market Prices', icon: TrendingUp, path: '/market-prices', color: 'bg-earth-gold' },
    { title: 'AI सहायक / AI Assistant', icon: MessageCircle, path: '/chatbot', color: 'bg-earth-blue' },
    { title: 'रिपोर्ट / Reports', icon: FileText, path: '/reports', color: 'bg-primary' },
    { title: 'सेटिंग्स / Settings', icon: Settings, path: '/settings', color: 'bg-muted' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">लोड हो रहा है... / Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Sprout className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">कृषि AI</h1>
              <p className="text-sm text-muted-foreground">नमस्ते, {user?.user_metadata?.name || 'किसान'}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSignOut}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            लॉग आउट
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Weather Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-earth-blue to-earth-green text-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white">
              <Cloud className="w-5 h-5" />
              मौसम अपडेट / Weather Update
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Thermometer className="w-6 h-6 mx-auto mb-1 opacity-90" />
                <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
                <p className="text-sm opacity-90">तापमान</p>
              </div>
              <div className="text-center">
                <Droplets className="w-6 h-6 mx-auto mb-1 opacity-90" />
                <p className="text-2xl font-bold">{weatherData.humidity}%</p>
                <p className="text-sm opacity-90">नमी</p>
              </div>
              <div className="text-center">
                <Wind className="w-6 h-6 mx-auto mb-1 opacity-90" />
                <p className="text-2xl font-bold">{weatherData.windSpeed}</p>
                <p className="text-sm opacity-90">हवा km/h</p>
              </div>
              <div className="text-center">
                <Cloud className="w-6 h-6 mx-auto mb-1 opacity-90" />
                <p className="text-lg font-bold">{weatherData.condition}</p>
                <p className="text-sm opacity-90">स्थिति</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white/10 rounded-lg">
              <p className="text-sm">📢 {weatherData.forecast}</p>
            </div>
          </CardContent>
        </Card>

        {/* Soil Health Snapshot */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-earth-brown" />
              मिट्टी स्वास्थ्य / Soil Health
            </CardTitle>
            <CardDescription>आपकी मिट्टी की वर्तमान स्थिति</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-3 bg-secondary rounded-lg">
                <p className="text-lg font-bold text-primary">{soilData.ph}</p>
                <p className="text-sm text-muted-foreground">pH Level</p>
              </div>
              <div className="text-center p-3 bg-secondary rounded-lg">
                <p className="text-lg font-bold text-earth-green">{soilData.nitrogen}</p>
                <p className="text-sm text-muted-foreground">नाइट्रोजन</p>
              </div>
              <div className="text-center p-3 bg-secondary rounded-lg">
                <p className="text-lg font-bold text-earth-gold">{soilData.phosphorus}</p>
                <p className="text-sm text-muted-foreground">फास्फोरस</p>
              </div>
              <div className="text-center p-3 bg-secondary rounded-lg">
                <p className="text-lg font-bold text-earth-blue">{soilData.potassium}</p>
                <p className="text-sm text-muted-foreground">पोटेशियम</p>
              </div>
              <div className="text-center p-3 bg-secondary rounded-lg">
                <p className="text-lg font-bold text-primary">{soilData.moisture}%</p>
                <p className="text-sm text-muted-foreground">नमी</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendation Card */}
        <Card className="border-2 border-primary/20 shadow-lg bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Sprout className="w-5 h-5" />
              AI फसल सुझाव / AI Crop Recommendation
            </CardTitle>
            <CardDescription>आपकी मिट्टी और मौसम के अनुसार</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">गेहूं (Wheat) - HD-2967</h3>
                  <p className="text-sm text-muted-foreground">अनुमानित उत्पादन: 45 क्विंटल/एकड़</p>
                  <p className="text-sm text-earth-green font-medium">लाभ मार्जिन: 35%</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-2xl">🌾</span>
                  </div>
                  <p className="text-xs text-muted-foreground">स्थिरता स्कोर: 4/5</p>
                </div>
              </div>
              <Button 
                className="w-full" 
                onClick={() => navigate('/crop-recommendation')}
              >
                विस्तृत सुझाव देखें / View Detailed Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Menu */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {menuItems.map((item, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => navigate(item.path)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-medium text-sm leading-tight">{item.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;