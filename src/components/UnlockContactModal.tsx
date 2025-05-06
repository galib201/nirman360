
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PoundSterling, Phone, Lock, UnlockKeyhole } from 'lucide-react';
import { toast } from 'sonner';

interface UnlockContactModalProps {
  propertyTitle: string;
  onUnlock: () => void;
}

const UnlockContactModal = ({ propertyTitle, onUnlock }: UnlockContactModalProps) => {
  const [unlockOption, setUnlockOption] = useState<string>('standard');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  
  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setOpen(false);
      onUnlock();
      
      const price = unlockOption === 'standard' ? '49' : '99';
      toast.success(`Payment of BDT ${price} successful! Contact is now unlocked.`);
    }, 2000);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full flex items-center gap-2">
          <Phone className="h-4 w-4" />
          Unlock Contact
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Unlock Owner Contact</DialogTitle>
          <DialogDescription>
            To view the owner's contact information for "{propertyTitle}", 
            please choose an unlock option.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <RadioGroup value={unlockOption} onValueChange={setUnlockOption} className="space-y-4">
            <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="standard" id="standard" />
              <div className="grid gap-1">
                <div className="flex items-center">
                  <Label htmlFor="standard" className="font-medium">Standard Unlock</Label>
                  <div className="ml-auto font-semibold">BDT 49</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Unlock contact for this property only
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="premium" id="premium" />
              <div className="grid gap-1">
                <div className="flex items-center">
                  <Label htmlFor="premium" className="font-medium">Premium Unlock</Label>
                  <div className="ml-auto font-semibold">BDT 99</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Unlock contact for all properties in this area for 7 days
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
        
        <div className="bg-muted p-3 rounded-md text-sm">
          <div className="flex items-center mb-2 text-nirman-navy">
            <Lock className="h-4 w-4 mr-2" />
            <span className="font-medium">Why do we charge for contact info?</span>
          </div>
          <p className="text-muted-foreground">
            This helps us filter serious inquiries and protect property owners from spam.
            We also use these fees to verify property listings and ensure data accuracy.
          </p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={handlePayment} disabled={isProcessing} className="gap-2">
            {isProcessing ? (
              <>Processing...</>
            ) : (
              <>
                <UnlockKeyhole className="h-4 w-4" />
                Pay & Unlock
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UnlockContactModal;
