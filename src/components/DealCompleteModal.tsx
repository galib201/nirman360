
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { PropertyService } from "@/services/api";
import { Property } from "@/models";
import { Check, PartyPopper, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface DealCompleteModalProps {
  property: Property;
  onSuccess: () => void;
}

const DealCompleteModal = ({ property, onSuccess }: DealCompleteModalProps) => {
  const [step, setStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  
  // Calculate success fee (1% of property price)
  const successFee = property.price * 0.01;
  
  const handleNextStep = () => {
    setStep(step + 1);
  };
  
  const handleCompleteDeal = () => {
    setIsProcessing(true);
    
    // Simulate processing the deal confirmation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      clearInterval(interval);
      setProgress(100);
      
      setTimeout(() => {
        setOpen(false);
        onSuccess();
        toast.success("Deal marked as completed! Your next property posting will be free.");
      }, 1000);
    }, 3000);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">Mark Deal as Complete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">Complete Property Deal</DialogTitle>
          <DialogDescription>
            Congratulations on finalizing your property deal! Let us know to update our records.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Deal Information</h3>
              
              <div className="border p-4 rounded-lg space-y-3">
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Property</span>
                  <span className="font-medium">{property.title}</span>
                </div>
                
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Location</span>
                  <span>{property.location.area}, {property.location.city}</span>
                </div>
                
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Transaction Type</span>
                  <span className="font-medium capitalize">{property.category}</span>
                </div>
                
                <div className="flex justify-between pb-2 border-b text-nirman-navy">
                  <span className="font-medium">Success Fee (1%)</span>
                  <span className="font-semibold">৳ {successFee.toLocaleString()}</span>
                </div>
                
                <div className="pt-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Your property will be marked as {property.category === 'rent' ? 'rented' : 'sold'} and removed from active listings.</span>
                  </p>
                </div>
              </div>
              
              <div className="bg-nirman-cream p-4 rounded-lg text-sm">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <PartyPopper className="h-4 w-4 text-nirman-gold" />
                  Special Offer
                </h4>
                <p className="text-muted-foreground">
                  By marking this deal as complete and paying the success fee, 
                  you'll receive a free premium listing for your next property!
                </p>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Confirmation</h3>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)} 
                  />
                  <div className="grid gap-1.5">
                    <Label 
                      htmlFor="terms" 
                      className="text-sm leading-relaxed"
                    >
                      I confirm that the deal for this property has been completed and I agree to pay
                      the success fee of ৳ {successFee.toLocaleString()} (1% of the property price).
                    </Label>
                  </div>
                </div>
              </div>
              
              {isProcessing && (
                <div className="space-y-2">
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-center text-muted-foreground">
                    Processing your request...
                  </p>
                </div>
              )}
              
              {progress === 100 && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Deal completion successful!</p>
                    <p className="text-sm">Your next property listing will be free.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <DialogFooter>
          {step === 1 ? (
            <Button onClick={handleNextStep} className="w-full sm:w-auto">Continue</Button>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
                disabled={isProcessing || progress === 100}
              >
                Back
              </Button>
              <Button 
                onClick={handleCompleteDeal} 
                disabled={!agreedToTerms || isProcessing || progress === 100}
              >
                {isProcessing ? "Processing..." : "Complete Deal"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DealCompleteModal;
