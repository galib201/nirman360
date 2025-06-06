
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MessageCircle, Unlock, CreditCard, Gift } from "lucide-react";
import { toast } from "sonner";

interface UnlockContactButtonProps {
  propertyId: string;
  ownerContact?: {
    name: string;
    phone: string;
    email: string;
    whatsapp?: string;
  };
  onUnlock?: () => void;
}

const UnlockContactButton = ({ propertyId, ownerContact, onUnlock }: UnlockContactButtonProps) => {
  const [hasUsedFreeUnlock, setHasUsedFreeUnlock] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const mockOwnerContact = {
    name: "Ahmed Rahman",
    phone: "+880 171 234 5678",
    email: "ahmed.rahman@example.com",
    whatsapp: "+880 171 234 5678"
  };

  const contact = ownerContact || mockOwnerContact;

  useEffect(() => {
    // Check if user has used their free unlock
    const freeUnlockUsed = localStorage.getItem('hasUsedFreeUnlock');
    setHasUsedFreeUnlock(!!freeUnlockUsed);

    // Check if this specific property contact is already unlocked
    const unlockedProperties = JSON.parse(localStorage.getItem('unlockedProperties') || '[]');
    setIsUnlocked(unlockedProperties.includes(propertyId));
  }, [propertyId]);

  const handleUnlock = () => {
    if (!hasUsedFreeUnlock) {
      // First unlock is free
      localStorage.setItem('hasUsedFreeUnlock', 'true');
      setHasUsedFreeUnlock(true);
      
      // Mark this property as unlocked
      const unlockedProperties = JSON.parse(localStorage.getItem('unlockedProperties') || '[]');
      unlockedProperties.push(propertyId);
      localStorage.setItem('unlockedProperties', JSON.stringify(unlockedProperties));
      
      setIsUnlocked(true);
      toast.success("Contact details unlocked! This was your free unlock.");
      onUnlock?.();
    } else {
      // Simulate payment process
      toast.success("Payment successful! Contact details unlocked.");
      
      // Mark this property as unlocked
      const unlockedProperties = JSON.parse(localStorage.getItem('unlockedProperties') || '[]');
      unlockedProperties.push(propertyId);
      localStorage.setItem('unlockedProperties', JSON.stringify(unlockedProperties));
      
      setIsUnlocked(true);
      onUnlock?.();
    }
    setIsOpen(false);
  };

  if (isUnlocked) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="w-full" variant="outline">
            <Phone className="mr-2 h-4 w-4" />
            View Contact Details
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Owner Contact Information</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-green-800">{contact.name}</p>
                  <p className="text-sm text-green-600">Property Owner</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-green-600" />
                    <a 
                      href={`tel:${contact.phone}`} 
                      className="text-blue-600 hover:underline"
                    >
                      {contact.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-green-600" />
                    <a 
                      href={`mailto:${contact.email}`} 
                      className="text-blue-600 hover:underline"
                    >
                      {contact.email}
                    </a>
                  </div>
                  
                  {contact.whatsapp && (
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-green-600" />
                      <a 
                        href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        WhatsApp
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Unlock className="mr-2 h-4 w-4" />
          {!hasUsedFreeUnlock ? 'Unlock Contact (Free)' : 'Pay to Unlock Contact'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Unlock Contact Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {!hasUsedFreeUnlock ? (
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">Free Unlock Available!</span>
              </div>
              <p className="text-sm text-green-700 mb-3">
                This is your first contact unlock. Get the owner's contact details for free!
              </p>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                No payment required
              </Badge>
            </Card>
          ) : (
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-800">Premium Unlock</span>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                Pay BDT 99 to unlock the owner's contact details for this property.
              </p>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                BDT 99
              </Badge>
            </Card>
          )}
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">You'll get access to:</p>
            <ul className="text-sm space-y-1">
              <li className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                Direct phone number
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                Email address
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-3 w-3" />
                WhatsApp contact
              </li>
            </ul>
          </div>
          
          <Button onClick={handleUnlock} className="w-full">
            {!hasUsedFreeUnlock ? 'Unlock for Free' : 'Pay BDT 99 & Unlock'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnlockContactButton;
