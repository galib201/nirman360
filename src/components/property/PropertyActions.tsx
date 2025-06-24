
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import UnlockContactButton from "@/components/UnlockContactButton";
import { Calendar, Building2, MapPin, TrendingUp, CreditCard, Info } from "lucide-react";
import { Property } from "@/models";
import { toast } from "@/hooks/use-toast";

interface PropertyActionsProps {
  property: Property;
  onAreaSnapshot: () => void;
  onROICalculator: () => void;
  onEMICalculator: () => void;
  onCompareProperty: () => void;
}

/**
 * PropertyActions - Sidebar component with booking, contact, and analysis actions
 * @param property - Property object for action context
 * @param onAreaSnapshot - Callback for area snapshot navigation
 * @param onROICalculator - Callback for ROI calculator navigation
 * @param onEMICalculator - Callback for EMI calculator navigation
 * @param onCompareProperty - Callback for property comparison navigation
 */
const PropertyActions: React.FC<PropertyActionsProps> = ({
  property,
  onAreaSnapshot,
  onROICalculator,
  onEMICalculator,
  onCompareProperty
}) => {
  const handleBookVisit = () => {
    toast({
      title: "Booking request sent!",
      description: "You'll be redirected to complete payment of BDT 99 to unlock contact details.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Book a Visit Card */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Book a Visit</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Schedule a visit to see this property in person
        </p>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full mb-4">
              <Calendar size={16} className="mr-2" />
              Book a Visit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Book a Visit</DialogTitle>
            </DialogHeader>
            <div className="py-4 px-2">
              <p className="mb-4">
                A small fee of <strong>BDT 99</strong> is required to unlock contact details and book a visit.
              </p>
              <p className="text-sm mb-6">
                This helps us ensure that only genuine visitors can book appointments.
              </p>
              <Button onClick={handleBookVisit} className="w-full">
                Pay BDT 99 to Continue
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <UnlockContactButton propertyId={property.id} />
      </Card>

      {/* Compare Property Card */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Compare Properties</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Compare this property with similar options
        </p>
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onCompareProperty}
        >
          <Building2 size={16} className="mr-2" />
          Compare with Other Properties
        </Button>
      </Card>

      {/* Property Analysis - Only for properties for sale */}
      {property.category === 'buy' && (
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Property Analysis</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get detailed insights and calculations for this property
          </p>
          
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={onAreaSnapshot}
            >
              <MapPin size={16} className="mr-2" />
              Detailed Area Snapshot
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={onROICalculator}
            >
              <TrendingUp size={16} className="mr-2" />
              Calculate ROI
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={onEMICalculator}
            >
              <CreditCard size={16} className="mr-2" />
              EMI Calculator
            </Button>
          </div>
        </Card>
      )}
      
      {/* Legal Help Card */}
      <Card className="p-6 bg-nirman-lightblue border-none">
        <div className="flex items-start mb-4">
          <Info size={24} className="text-nirman-navy mr-2 mt-1" />
          <div>
            <h3 className="font-semibold text-lg">Need Legal Help?</h3>
            <p className="text-sm text-muted-foreground">
              Get professional assistance with documentation and legal formalities
            </p>
          </div>
        </div>
        <Button variant="secondary" className="w-full">
          Explore Legal Services
        </Button>
      </Card>
    </div>
  );
};

export default PropertyActions;
