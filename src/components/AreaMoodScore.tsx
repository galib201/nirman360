
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Users, TreePine } from "lucide-react";

interface AreaMoodScoreProps {
  area: string;
  score?: number;
  characteristics?: string[];
}

const AreaMoodScore = ({ area, score = 4.3, characteristics = ['Quiet', 'Safe', 'Family-friendly'] }: AreaMoodScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 4.0) return 'text-blue-600';
    if (score >= 3.5) return 'text-amber-600';
    return 'text-red-600';
  };

  const getCharacteristicIcon = (characteristic: string) => {
    const lower = characteristic.toLowerCase();
    if (lower.includes('quiet') || lower.includes('peaceful')) return <TreePine className="h-3 w-3" />;
    if (lower.includes('safe') || lower.includes('secure')) return <Shield className="h-3 w-3" />;
    if (lower.includes('family') || lower.includes('community')) return <Users className="h-3 w-3" />;
    return <Star className="h-3 w-3" />;
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-nirman-cream to-white border-nirman-lightblue">
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-nirman-navy mb-1">Area Mood Score</h3>
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
              {score.toFixed(1)}
            </span>
            <span className="text-muted-foreground">/5.0</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.floor(score) 
                      ? 'text-yellow-400 fill-current' 
                      : star === Math.ceil(score) && score % 1 >= 0.5
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-2">Area Characteristics:</p>
          <div className="flex flex-wrap gap-2">
            {characteristics.map((characteristic, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs bg-nirman-lightblue text-nirman-navy"
              >
                <span className="mr-1">{getCharacteristicIcon(characteristic)}</span>
                {characteristic}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground pt-2 border-t">
          Based on resident feedback and local data for {area}
        </div>
      </div>
    </Card>
  );
};

export default AreaMoodScore;
