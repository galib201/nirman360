
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { School, Train, Shield, ShoppingCart, Hospital, MapPin } from "lucide-react";

interface AreaSnapshotProps {
  area: string;
}

const AreaSnapshotCard = ({ area }: AreaSnapshotProps) => {
  // Mock data based on area
  const getAreaStats = (areaName: string) => {
    const mockData = {
      'Dhanmondi': {
        nearbySchools: 5,
        metroDistance: '600m',
        safetyRating: 'High',
        shoppingCenters: 3,
        hospitals: 2,
        walkScore: 85
      },
      'Gulshan': {
        nearbySchools: 4,
        metroDistance: '400m',
        safetyRating: 'Very High',
        shoppingCenters: 6,
        hospitals: 3,
        walkScore: 92
      },
      'Uttara': {
        nearbySchools: 6,
        metroDistance: '1.2km',
        safetyRating: 'High',
        shoppingCenters: 4,
        hospitals: 2,
        walkScore: 78
      },
      'Banani': {
        nearbySchools: 3,
        metroDistance: '500m',
        safetyRating: 'Very High',
        shoppingCenters: 5,
        hospitals: 2,
        walkScore: 88
      }
    };

    return mockData[areaName as keyof typeof mockData] || {
      nearbySchools: 3,
      metroDistance: '800m',
      safetyRating: 'High',
      shoppingCenters: 2,
      hospitals: 1,
      walkScore: 75
    };
  };

  const stats = getAreaStats(area);

  const getSafetyColor = (rating: string) => {
    switch (rating) {
      case 'Very High': return 'bg-green-100 text-green-800 border-green-200';
      case 'High': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getWalkScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-5 w-5 text-nirman-navy" />
        <h3 className="text-lg font-semibold text-nirman-navy">Area Snapshot</h3>
      </div>
      
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground mb-3">
          Key amenities and statistics for <strong>{area}</strong>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <School className="h-5 w-5 text-nirman-navy" />
            <div>
              <div className="font-semibold text-lg">{stats.nearbySchools}</div>
              <div className="text-xs text-muted-foreground">Nearby Schools</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Train className="h-5 w-5 text-nirman-navy" />
            <div>
              <div className="font-semibold text-lg">{stats.metroDistance}</div>
              <div className="text-xs text-muted-foreground">Metro Station</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <ShoppingCart className="h-5 w-5 text-nirman-navy" />
            <div>
              <div className="font-semibold text-lg">{stats.shoppingCenters}</div>
              <div className="text-xs text-muted-foreground">Shopping Centers</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Hospital className="h-5 w-5 text-nirman-navy" />
            <div>
              <div className="font-semibold text-lg">{stats.hospitals}</div>
              <div className="text-xs text-muted-foreground">Hospitals</div>
            </div>
          </div>
        </div>
        
        {/* Safety Rating */}
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="font-medium">Safety Rating</span>
          </div>
          <Badge className={getSafetyColor(stats.safetyRating)}>
            {stats.safetyRating}
          </Badge>
        </div>
        
        {/* Walk Score */}
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="font-medium">Walk Score</span>
          </div>
          <div className="text-right">
            <div className={`font-semibold text-lg ${getWalkScoreColor(stats.walkScore)}`}>
              {stats.walkScore}/100
            </div>
            <div className="text-xs text-muted-foreground">Very Walkable</div>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="text-xs text-muted-foreground pt-2 border-t">
          Data based on local amenities and resident feedback
        </div>
      </div>
    </Card>
  );
};

export default AreaSnapshotCard;
