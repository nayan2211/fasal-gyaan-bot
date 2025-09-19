import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Award, Target, Zap, Heart, Sprout, TrendingUp } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  icon: React.ElementType;
  type: 'bronze' | 'silver' | 'gold';
  progress?: number;
  maxProgress?: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface AchievementBadgeProps {
  achievements: Achievement[];
  showOnlyUnlocked?: boolean;
  isCompact?: boolean;
}

const typeColors = {
  bronze: 'bg-achievement-bronze text-white',
  silver: 'bg-achievement-silver text-gray-800',
  gold: 'bg-achievement-gold text-white'
};

const typeEmojis = {
  bronze: '🥉',
  silver: '🥈', 
  gold: '🥇'
};

const sampleAchievements: Achievement[] = [
  {
    id: 'first-crop',
    title: 'First Harvest',
    titleHindi: 'पहली फसल',
    description: 'Successfully completed your first crop recommendation',
    descriptionHindi: 'सफलतापूर्वक अपनी पहली फसल की सिफारिश पूरी की',
    icon: Sprout,
    type: 'bronze',
    unlocked: true,
    unlockedAt: new Date('2024-01-15')
  },
  {
    id: 'water-saver',
    title: 'Water Conservation Expert',
    titleHindi: 'जल संरक्षण विशेषज्ञ',
    description: 'Saved 500+ liters of water using smart irrigation',
    descriptionHindi: 'स्मार्ट सिंचाई का उपयोग करके 500+ लीटर पानी बचाया',
    icon: Target,
    type: 'silver',
    progress: 350,
    maxProgress: 500,
    unlocked: false
  },
  {
    id: 'profit-master',
    title: 'Profit Master',
    titleHindi: 'लाभ मास्टर',
    description: 'Achieved 50%+ profit margin for 3 consecutive seasons',
    descriptionHindi: 'लगातार 3 सीज़न के लिए 50%+ लाभ मार्जिन हासिल किया',
    icon: TrendingUp,
    type: 'gold',
    unlocked: true,
    unlockedAt: new Date('2024-02-10')
  },
  {
    id: 'ai-friend',
    title: 'AI Assistant Champion',
    titleHindi: 'AI सहायक चैंपियन',
    description: 'Used AI recommendations 50+ times',
    descriptionHindi: 'AI सिफारिशों का 50+ बार उपयोग किया',
    icon: Zap,
    type: 'silver',
    progress: 32,
    maxProgress: 50,
    unlocked: false
  },
  {
    id: 'community-helper',
    title: 'Community Helper',
    titleHindi: 'समुदायिक सहायक',
    description: 'Helped 10+ fellow farmers with advice',
    descriptionHindi: 'सलाह के साथ 10+ साथी किसानों की मदद की',
    icon: Heart,
    type: 'gold',
    unlocked: false,
    progress: 7,
    maxProgress: 10
  }
];

export const AchievementBadge = ({ 
  achievements = sampleAchievements, 
  showOnlyUnlocked = false,
  isCompact = false 
}: AchievementBadgeProps) => {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const filteredAchievements = showOnlyUnlocked 
    ? achievements.filter(a => a.unlocked)
    : achievements;

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  if (isCompact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Trophy className="w-4 h-4 text-achievement-gold" />
          <span className="text-sm font-medium">{unlockedCount}/{totalCount}</span>
        </div>
        <div className="flex -space-x-1">
          {achievements.slice(0, 3).map((achievement) => (
            <div
              key={achievement.id}
              className={`w-6 h-6 rounded-full border-2 border-background flex items-center justify-center text-xs ${
                achievement.unlocked ? typeColors[achievement.type] : 'bg-muted text-muted-foreground'
              }`}
            >
              {achievement.unlocked ? typeEmojis[achievement.type] : '🔒'}
            </div>
          ))}
          {achievements.length > 3 && (
            <div className="w-6 h-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs">
              +{achievements.length - 3}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Achievement Summary */}
      <Card className="border-achievement-gold/30 bg-gradient-warm/10">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-achievement-gold rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">उपलब्धियां / Achievements</h3>
                <p className="text-sm text-muted-foreground">
                  {unlockedCount} में से {totalCount} अनलॉक किए गए
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-achievement-gold">
                {Math.round((unlockedCount / totalCount) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">पूर्ण</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAchievements.map((achievement) => {
          const IconComponent = achievement.icon;
          const progressPercentage = achievement.progress && achievement.maxProgress 
            ? (achievement.progress / achievement.maxProgress) * 100 
            : 0;

          return (
            <Card
              key={achievement.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                achievement.unlocked 
                  ? 'border-2 border-achievement-gold/50 shadow-warm' 
                  : 'border border-muted opacity-75'
              }`}
              onClick={() => setSelectedAchievement(achievement)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    achievement.unlocked 
                      ? typeColors[achievement.type]
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {achievement.unlocked ? (
                      <IconComponent className="w-6 h-6" />
                    ) : (
                      <span className="text-lg">🔒</span>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm">{achievement.titleHindi}</h4>
                      {achievement.unlocked && (
                        <Badge variant="secondary" className="text-xs">
                          {typeEmojis[achievement.type]}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {achievement.descriptionHindi}
                    </p>
                    
                    {/* Progress Bar for Unlocked Achievements */}
                    {!achievement.unlocked && achievement.progress && achievement.maxProgress && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>प्रगति: {achievement.progress}/{achievement.maxProgress}</span>
                          <span>{Math.round(progressPercentage)}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="h-2 bg-earth-green rounded-full transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Unlock Date */}
                    {achievement.unlocked && achievement.unlockedAt && (
                      <p className="text-xs text-earth-green font-medium">
                        ✓ {achievement.unlockedAt.toLocaleDateString('hi-IN')} को अनलॉक किया गया
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};