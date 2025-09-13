import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sprout, Brain, Smartphone } from "lucide-react";
import heroImage from "@/assets/hero-farming.jpg";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Modern farming with AI technology" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
        <div className="mb-8 flex items-center justify-center gap-2">
          <Sprout className="h-8 w-8 text-earth-gold" />
          <span className="text-2xl font-bold">CropAI</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Smart Farming
          <span className="block text-earth-gold">Powered by AI</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
          Get personalized crop recommendations based on soil analysis, weather data, 
          and market trends. Increase your yield and profit with science-backed decisions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="text-lg px-8 py-4 bg-primary hover:bg-primary/90"
            onClick={() => navigate('/auth')}
          >
            <Brain className="h-5 w-5 mr-2" />
            Get Crop Recommendations
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-earth-brown"
            onClick={() => navigate('/auth')}
          >
            <Smartphone className="h-5 w-5 mr-2" />
            किसान पोर्टल / Farmer Portal
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-earth-gold mb-2">25%</div>
            <div className="text-lg">Increase in Yield</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-earth-gold mb-2">10K+</div>
            <div className="text-lg">Farmers Helped</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-earth-gold mb-2">50+</div>
            <div className="text-lg">Crop Varieties</div>
          </div>
        </div>
      </div>
    </section>
  );
};