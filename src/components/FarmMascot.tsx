import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Volume2, VolumeX } from 'lucide-react';

interface FarmMascotProps {
  message?: string;
  isVisible?: boolean;
  onClose?: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'center';
}

const farmingQuotes = [
  "🌱 हर छोटा बीज एक बड़े सपने की शुरुआत है! / Every small seed is the beginning of a big dream!",
  "🌾 धैर्य से बोए गए बीज सबसे मीठे फल देते हैं / Seeds sown with patience give the sweetest fruits",
  "☀️ सूरज हर दिन किसानों को नई उम्मीद देता है / The sun gives farmers new hope every day",
  "💧 पानी की हर बूंद मिट्टी में जीवन डालती है / Every drop of water brings life to the soil",
  "🌿 प्रकृति के साथ दोस्ती सबसे अच्छी खेती है / Friendship with nature is the best farming"
];

export const FarmMascot = ({ 
  message, 
  isVisible = false, 
  onClose,
  position = 'bottom-right' 
}: FarmMascotProps) => {
  const [currentQuote, setCurrentQuote] = useState(farmingQuotes[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuote(farmingQuotes[Math.floor(Math.random() * farmingQuotes.length)]);
        setIsAnimating(false);
      }, 500);
    }, 15000); // Change quote every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any current speech
      window.speechSynthesis.cancel();
      
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN'; // Hindi language
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const positionClasses = {
    'bottom-right': 'fixed bottom-4 right-4 z-50',
    'bottom-left': 'fixed bottom-4 left-4 z-50',
    'center': 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'
  };

  if (!isVisible && !message) return null;

  return (
    <div className={positionClasses[position]}>
      <Card className="max-w-sm shadow-warm border-2 border-earth-gold/30 bg-gradient-to-br from-earth-gold/10 to-earth-orange/10 backdrop-blur">
        <CardContent className="p-4">
          {/* Mascot Avatar */}
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-2xl">👨‍🌾</span>
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-earth-brown text-sm">
                  राम चाचा / Uncle Ram
                </h3>
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() => isSpeaking ? stopSpeaking() : speakText(message || currentQuote)}
                  >
                    {isSpeaking ? (
                      <VolumeX className="h-3 w-3 text-earth-blue" />
                    ) : (
                      <Volume2 className="h-3 w-3 text-earth-blue" />
                    )}
                  </Button>
                  {onClose && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={onClose}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
              
              <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
                <p className="text-sm text-foreground leading-relaxed">
                  {message || currentQuote}
                </p>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="flex justify-center mt-3 space-x-2">
            <span className="text-xs opacity-60">🌱</span>
            <span className="text-xs opacity-60">🌾</span>
            <span className="text-xs opacity-60">🌿</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};