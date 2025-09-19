import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Volume2, Languages } from 'lucide-react';

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface VoiceInterfaceProps {
  onVoiceResult?: (text: string, language: string) => void;
  isListening?: boolean;
  onToggleListening?: () => void;
  supportedLanguages?: string[];
}

export const VoiceInterface = ({
  onVoiceResult,
  isListening = false,
  onToggleListening,
  supportedLanguages = ['hi-IN', 'en-IN', 'bn-IN', 'gu-IN', 'mr-IN']
}: VoiceInterfaceProps) => {
  const [recognition, setRecognition] = useState<any | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('hi-IN');
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [confidence, setConfidence] = useState(0);

  const languageNames: Record<string, string> = {
    'hi-IN': 'हिंदी / Hindi',
    'en-IN': 'English',
    'bn-IN': 'বাংলা / Bengali',
    'gu-IN': 'ગુજરાતી / Gujarati',
    'mr-IN': 'मराठी / Marathi'
  };

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = selectedLanguage;
      
      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
            setConfidence(result[0].confidence);
          } else {
            interimTranscript += result[0].transcript;
          }
        }
        
        setTranscript(finalTranscript || interimTranscript);
        
        if (finalTranscript && onVoiceResult) {
          onVoiceResult(finalTranscript, selectedLanguage);
        }
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };
      
      recognitionInstance.onend = () => {
        if (isListening && onToggleListening) {
          onToggleListening();
        }
      };
      
      setRecognition(recognitionInstance);
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, [selectedLanguage]);

  const toggleListening = () => {
    if (!recognition) return;
    
    if (isListening) {
      recognition.stop();
      setTranscript('');
    } else {
      recognition.lang = selectedLanguage;
      recognition.start();
    }
    
    if (onToggleListening) {
      onToggleListening();
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage;
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isSupported) {
    return (
      <Card className="border-earth-sunset border-2">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground">
            वॉयस सुविधा इस डिवाइस पर उपलब्ध नहीं है / Voice feature not available on this device
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-earth-blue border-2 shadow-warm">
      <CardContent className="p-4 space-y-4">
        {/* Language Selection */}
        <div className="flex items-center gap-2 text-sm">
          <Languages className="w-4 h-4 text-earth-blue" />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="flex-1 p-2 rounded-md border border-input bg-background text-sm"
          >
            {supportedLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {languageNames[lang] || lang}
              </option>
            ))}
          </select>
        </div>

        {/* Voice Controls */}
        <div className="flex items-center gap-3">
          <Button
            onClick={toggleListening}
            className={`flex-1 ${isListening ? 'bg-earth-sunset hover:bg-earth-sunset/90' : 'bg-earth-blue hover:bg-earth-blue/90'}`}
            size="lg"
          >
            {isListening ? (
              <>
                <MicOff className="w-5 h-5 mr-2" />
                बंद करें / Stop
              </>
            ) : (
              <>
                <Mic className="w-5 h-5 mr-2" />
                बोलना शुरू करें / Start Speaking
              </>
            )}
          </Button>
          
          {transcript && (
            <Button
              onClick={() => speakText(transcript)}
              variant="outline"
              size="lg"
              className="border-earth-green"
            >
              <Volume2 className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Live Transcript */}
        {transcript && (
          <div className="p-3 bg-earth-mint/10 rounded-lg border border-earth-mint/30">
            <p className="text-sm text-foreground">
              <span className="font-medium">आपने कहा / You said:</span>
            </p>
            <p className="text-foreground mt-1">{transcript}</p>
            {confidence > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                विश्वसनीयता / Confidence: {Math.round(confidence * 100)}%
              </p>
            )}
          </div>
        )}

        {/* Status Indicator */}
        {isListening && (
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-earth-sunset rounded-full animate-pulse"></div>
            <span className="text-sm text-earth-sunset font-medium">
              सुन रहा है... / Listening...
            </span>
            <div className="w-2 h-2 bg-earth-sunset rounded-full animate-pulse"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};