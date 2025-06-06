
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface PostVisitRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
  propertyTitle: string;
}

const PostVisitRatingModal = ({ isOpen, onClose, propertyId, propertyTitle }: PostVisitRatingModalProps) => {
  const [ratings, setRatings] = useState({
    cleanliness: 3,
    ownerBehavior: 3,
    areaAccuracy: 3
  });

  const handleRatingChange = (category: keyof typeof ratings, value: number[]) => {
    setRatings(prev => ({
      ...prev,
      [category]: value[0]
    }));
  };

  const renderStars = (rating: number, onStarClick: (star: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-6 w-6 cursor-pointer transition-colors ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            onClick={() => onStarClick(star)}
          />
        ))}
      </div>
    );
  };

  const handleSubmit = () => {
    // Store ratings in localStorage
    const existingRatings = JSON.parse(localStorage.getItem('propertyRatings') || '{}');
    existingRatings[propertyId] = {
      ...ratings,
      timestamp: new Date().toISOString(),
      propertyTitle
    };
    localStorage.setItem('propertyRatings', JSON.stringify(existingRatings));
    
    toast.success("Thank you for your feedback! Your ratings have been saved.");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rate Your Visit Experience</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            How was your visit to <strong>{propertyTitle}</strong>?
          </p>
          
          <div className="space-y-4">
            {/* Cleanliness Rating */}
            <Card className="p-4">
              <div className="space-y-3">
                <label className="font-medium">Cleanliness</label>
                {renderStars(ratings.cleanliness, (star) => 
                  setRatings(prev => ({ ...prev, cleanliness: star }))
                )}
                <Slider
                  value={[ratings.cleanliness]}
                  onValueChange={(value) => handleRatingChange('cleanliness', value)}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">Rating: {ratings.cleanliness}/5</p>
              </div>
            </Card>

            {/* Owner Behavior Rating */}
            <Card className="p-4">
              <div className="space-y-3">
                <label className="font-medium">Owner Behavior</label>
                {renderStars(ratings.ownerBehavior, (star) => 
                  setRatings(prev => ({ ...prev, ownerBehavior: star }))
                )}
                <Slider
                  value={[ratings.ownerBehavior]}
                  onValueChange={(value) => handleRatingChange('ownerBehavior', value)}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">Rating: {ratings.ownerBehavior}/5</p>
              </div>
            </Card>

            {/* Area Accuracy Rating */}
            <Card className="p-4">
              <div className="space-y-3">
                <label className="font-medium">Area Accuracy</label>
                {renderStars(ratings.areaAccuracy, (star) => 
                  setRatings(prev => ({ ...prev, areaAccuracy: star }))
                )}
                <Slider
                  value={[ratings.areaAccuracy]}
                  onValueChange={(value) => handleRatingChange('areaAccuracy', value)}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">Rating: {ratings.areaAccuracy}/5</p>
              </div>
            </Card>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Skip
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Submit Ratings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostVisitRatingModal;
