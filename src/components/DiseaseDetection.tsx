import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, Upload, Scan, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { toast } from 'sonner';

interface DiseaseResult {
  disease_name: string;
  hindi_name: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  symptoms: string[];
  treatment: string[];
  prevention: string[];
  organic_remedy: string[];
}

const mockDiseaseResults: DiseaseResult[] = [
  {
    disease_name: 'Leaf Blight',
    hindi_name: 'पत्ती झुलसा रोग',
    confidence: 85,
    severity: 'medium',
    symptoms: [
      'पत्तियों पर भूरे रंग के धब्बे',
      'पत्तियों का मुरझाना',
      'पीले रंग की पत्तियां'
    ],
    treatment: [
      'कॉपर ऑक्सीक्लोराइड का छिड़काव',
      'प्रभावित पत्तियों को हटाएं',
      'खेत में जल निकासी की व्यवस्था करें'
    ],
    prevention: [
      'बीज उपचार करें',
      'संतुलित उर्वरक का प्रयोग',
      'फसल चक्र अपनाएं'
    ],
    organic_remedy: [
      'नीम का तेल का छिड़काव',
      'लहसुन-मिर्च का घोल',
      'गोमूत्र का इस्तेमाल'
    ]
  }
];

export const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<DiseaseResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('फ़ाइल का साइज़ 10MB से कम होना चाहिए / File size should be less than 10MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResults([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast.error('कृपया पहले फोटो अपलोड करें / Please upload a photo first');
      return;
    }

    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setResults(mockDiseaseResults);
      setAnalyzing(false);
      toast.success('विश्लेषण पूरा हुआ / Analysis completed');
    }, 3000);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setResults([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-earth-green text-white';
      case 'medium': return 'bg-earth-gold text-white';
      case 'high': return 'bg-destructive text-white';
      default: return 'bg-secondary';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <CheckCircle className="w-4 h-4" />;
      case 'medium': return <Info className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          रोग पहचान / Disease Detection
        </h1>
        <p className="text-muted-foreground">
          पौधे की फोटो खींचें और AI से बीमारी की पहचान करें
        </p>
      </div>

      {/* Upload Section */}
      <Card className="shadow-warm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" />
            फोटो अपलोड करें / Upload Photo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              बेहतर परिणामों के लिए: स्पष्ट रोशनी में पत्तियों या पौधे की नजदीकी फोटो खींचें। 
              / For better results: Take close-up photos of leaves or plants in clear lighting.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              size="lg"
              className="h-20 flex flex-col gap-2"
              onClick={() => cameraInputRef.current?.click()}
            >
              <Camera className="w-8 h-8" />
              <span>कैमरा से फोटो / Take Photo</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-20 flex flex-col gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-8 h-8" />
              <span>गैलरी से चुनें / Choose from Gallery</span>
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
            className="hidden"
          />

          {selectedImage && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Uploaded crop"
                  className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={clearImage}
                >
                  ✕
                </Button>
              </div>
              
              <div className="flex gap-2 justify-center">
                <Button 
                  onClick={analyzeImage} 
                  disabled={analyzing}
                  className="flex items-center gap-2"
                >
                  {analyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      विश्लेषण हो रहा है... / Analyzing...
                    </>
                  ) : (
                    <>
                      <Scan className="w-4 h-4" />
                      विश्लेषण करें / Analyze
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={clearImage}>
                  नई फोटो / New Photo
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="space-y-6">
          {results.map((result, index) => (
            <Card key={index} className="shadow-warm border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {result.disease_name} / {result.hindi_name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(result.severity)}>
                      {getSeverityIcon(result.severity)}
                      <span className="ml-1">
                        {result.severity === 'low' ? 'हल्का / Mild' :
                         result.severity === 'medium' ? 'मध्यम / Moderate' :
                         'गंभीर / Severe'}
                      </span>
                    </Badge>
                    <Badge variant="outline">
                      विश्वसनीयता / Confidence: {result.confidence}%
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Symptoms */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-earth-gold" />
                    लक्षण / Symptoms
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {result.symptoms.map((symptom, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                        <span className="text-earth-gold">•</span>
                        <span className="text-sm">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Treatment */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-earth-blue" />
                    उपचार / Treatment
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {result.treatment.map((treatment, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-earth-blue/10 rounded">
                        <span className="text-earth-blue">•</span>
                        <span className="text-sm">{treatment}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Organic Remedy */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="text-earth-green">🌿</span>
                    जैविक उपचार / Organic Remedy
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {result.organic_remedy.map((remedy, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-earth-green/10 rounded">
                        <span className="text-earth-green">•</span>
                        <span className="text-sm">{remedy}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prevention */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="text-earth-brown">🛡️</span>
                    बचाव / Prevention
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {result.prevention.map((prevention, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-earth-brown/10 rounded">
                        <span className="text-earth-brown">•</span>
                        <span className="text-sm">{prevention}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Help Section */}
      <Card className="shadow-warm bg-gradient-to-r from-earth-mint/10 to-earth-blue/10">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-3">सहायता चाहिए? / Need Help?</h3>
          <p className="text-muted-foreground mb-4">
            यदि आपको अपनी समस्या का समाधान नहीं मिला, तो कृषि विशेषज्ञ से संपर्क करें।
            / If you didn't find a solution to your problem, contact an agricultural expert.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline">
              📞 विशेषज्ञ कॉल / Expert Call
            </Button>
            <Button variant="outline">
              💬 चैट सहायता / Chat Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};