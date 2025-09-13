import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TestTube, 
  Cloud, 
  TrendingUp, 
  Leaf, 
  Globe, 
  Smartphone,
  Satellite,
  BarChart3 
} from "lucide-react";

const features = [
  {
    icon: TestTube,
    title: "Soil Analysis",
    description: "Real-time soil pH, moisture, and nutrient analysis using satellite data and IoT sensors",
    color: "text-earth-brown"
  },
  {
    icon: Cloud,
    title: "Weather Intelligence",
    description: "Localized weather forecasts and climate pattern analysis for optimal planting decisions",
    color: "text-earth-blue"
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description: "Current market prices, demand trends, and profit margin predictions for different crops",
    color: "text-earth-gold"
  },
  {
    icon: Leaf,
    title: "Sustainability Scoring",
    description: "Environmental impact assessment and sustainable farming practice recommendations",
    color: "text-earth-green"
  },
  {
    icon: Satellite,
    title: "Satellite Monitoring",
    description: "Advanced satellite imagery for crop health monitoring and yield predictions",
    color: "text-earth-blue"
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Voice and chat interfaces in local languages including Hindi, Bengali, and regional dialects",
    color: "text-earth-brown"
  },
  {
    icon: Smartphone,
    title: "Offline Capability",
    description: "Works in low-connectivity areas with offline data synchronization when online",
    color: "text-earth-green"
  },
  {
    icon: BarChart3,
    title: "Yield Forecasting",
    description: "AI-powered yield predictions and profit analysis based on historical and current data",
    color: "text-earth-gold"
  }
];

export const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Comprehensive Farm Intelligence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI platform combines multiple data sources to provide you with actionable insights 
            for better farming decisions and increased profitability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 border-muted hover:border-earth-gold/20"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-muted w-fit">
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};