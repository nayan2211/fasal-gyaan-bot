import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sprout, TrendingUp, Leaf, DollarSign, MapPin, Calendar } from "lucide-react";

interface CropRecommendation {
  name: string;
  confidence: number;
  expectedYield: string;
  profitMargin: string;
  sustainabilityScore: number;
  season: string;
  reasons: string[];
}

const mockRecommendations: CropRecommendation[] = [
  {
    name: "Rice (Basmati)",
    confidence: 92,
    expectedYield: "4.2 tons/hectare",
    profitMargin: "₹35,000-45,000",
    sustainabilityScore: 85,
    season: "Kharif",
    reasons: ["High soil moisture", "Optimal pH for rice", "Good market demand", "Monsoon season"]
  },
  {
    name: "Wheat",
    confidence: 88,
    expectedYield: "3.8 tons/hectare", 
    profitMargin: "₹28,000-38,000",
    sustainabilityScore: 78,
    season: "Rabi",
    reasons: ["Suitable soil composition", "Weather patterns favorable", "Local market preference"]
  },
  {
    name: "Maize",
    confidence: 84,
    expectedYield: "5.5 tons/hectare",
    profitMargin: "₹32,000-42,000",
    sustainabilityScore: 82,
    season: "Kharif",
    reasons: ["Drought resistant", "Good market price", "Low water requirement"]
  }
];

export const CropRecommendation = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    soilType: "",
    farmSize: "",
    budget: "",
    previousCrop: ""
  });

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Get Your Crop Recommendations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enter your farm details and get AI-powered crop recommendations tailored to your specific conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-farm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-earth-blue" />
                Farm Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location (District/State)</Label>
                <Input 
                  id="location"
                  placeholder="e.g., Ranchi, Jharkhand"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="soilType">Soil Type</Label>
                <Select onValueChange={(value) => setFormData({...formData, soilType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clay">Clay</SelectItem>
                    <SelectItem value="sandy">Sandy</SelectItem>
                    <SelectItem value="loamy">Loamy</SelectItem>
                    <SelectItem value="red">Red Soil</SelectItem>
                    <SelectItem value="black">Black Soil</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmSize">Farm Size (Hectares)</Label>
                <Input 
                  id="farmSize"
                  type="number"
                  placeholder="e.g., 2.5"
                  value={formData.farmSize}
                  onChange={(e) => setFormData({...formData, farmSize: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Available Budget (₹)</Label>
                <Input 
                  id="budget"
                  type="number"
                  placeholder="e.g., 50000"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousCrop">Previous Crop</Label>
                <Select onValueChange={(value) => setFormData({...formData, previousCrop: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select previous crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="maize">Maize</SelectItem>
                    <SelectItem value="sugarcane">Sugarcane</SelectItem>
                    <SelectItem value="fallow">Fallow Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sprout className="h-5 w-5 mr-2" />
                    Get Recommendations
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {showResults && (
              <>
                <Card className="border-earth-gold/20 shadow-farm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-earth-green">
                      <TrendingUp className="h-5 w-5" />
                      Recommended Crops
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockRecommendations.map((crop, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-lg">{crop.name}</h4>
                            <Badge variant="secondary" className="bg-earth-green text-white">
                              {crop.confidence}% Match
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-earth-blue" />
                              <span>{crop.expectedYield}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-earth-gold" />
                              <span>{crop.profitMargin}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Leaf className="h-4 w-4 text-earth-green" />
                              <span>Sustainability: {crop.sustainabilityScore}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-earth-brown" />
                              <span>{crop.season} Season</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {crop.reasons.map((reason, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {reason}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {!showResults && !isAnalyzing && (
              <Card className="shadow-card">
                <CardContent className="p-8 text-center">
                  <Sprout className="h-16 w-16 text-earth-green mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Ready to Get Started?</h3>
                  <p className="text-muted-foreground">
                    Fill in your farm details to receive personalized crop recommendations 
                    based on AI analysis of soil, weather, and market conditions.
                  </p>
                </CardContent>
              </Card>
            )}

            {isAnalyzing && (
              <Card className="shadow-card">
                <CardContent className="p-8 text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-earth-green mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold mb-2">Analyzing Your Farm</h3>
                  <p className="text-muted-foreground">
                    Processing satellite data, weather patterns, soil composition, 
                    and market trends to find the best crops for your farm...
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};