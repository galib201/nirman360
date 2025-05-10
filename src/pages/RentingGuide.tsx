
import Header from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Building2, Users, Home, CheckCircle } from "lucide-react";

interface RentingGuideProps {
  onLogoClick?: () => void;
}

const RentingGuide = ({ onLogoClick }: RentingGuideProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header onLogoClick={onLogoClick} />
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Renting Guide</h1>
          <p className="text-muted-foreground mb-8">
            Everything you need to know about renting property in Bangladesh
          </p>
          
          <div className="grid gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Why Rent with Nirman360?</h3>
                    <p className="text-muted-foreground">
                      Nirman360 offers verified rental listings with specialized filters for bachelor-friendly, 
                      family-appropriate, and women-only accommodations. Our transparent system ensures 
                      you know exactly what you're getting before signing a lease.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <h2 className="text-xl font-semibold mt-4 mb-2">Step-by-Step Renting Process</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="step1">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">1</div>
                    <span>Determine Your Budget & Requirements</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8">
                    <p className="mb-4">Before you start looking for rental properties, clarify your needs and budget.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Set a realistic monthly budget for rent (typically 30-40% of your monthly income)</li>
                      <li>Consider additional costs like utility bills, service charges, and maintenance fees</li>
                      <li>Determine your preferred location, size, and essential amenities</li>
                      <li>Decide if you need bachelor-friendly, family-appropriate, or women-only accommodations</li>
                    </ul>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate("/nirman-ai")}
                    >
                      Use Nirman AI Rental Finder
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step2">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">2</div>
                    <span>Search & Filter Properties</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8">
                    <p className="mb-4">Use our specialized filters to find properties that match your specific needs.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Filter properties by location, price range, size, and number of bedrooms/bathrooms</li>
                      <li>Use our specialized filters for bachelor-friendly, family-appropriate, or women-only options</li>
                      <li>Check the Area Snapshot to understand the neighborhood better</li>
                      <li>Set up Rental Alerts to get notified when properties matching your criteria become available</li>
                    </ul>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate("/properties?category=rent")}
                    >
                      Browse Rental Properties
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step3">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">3</div>
                    <span>Visit Properties & Ask Questions</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8">
                    <p className="mb-4">Always visit properties in person and ask detailed questions.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Book visits through our platform to see properties that interest you</li>
                      <li>Check the property condition, water supply, electricity, and internet connectivity</li>
                      <li>Ask about utility bills, maintenance responsibilities, and property rules</li>
                      <li>Inquire about security arrangements, parking facilities, and common area usage</li>
                      <li>Verify if the person showing the property is the actual owner or an authorized agent</li>
                    </ul>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate("/area-snapshot")}
                    >
                      Check Area Snapshots
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step4">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">4</div>
                    <span>Negotiate Terms & Sign Agreement</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8">
                    <p className="mb-4">After finding the right property, negotiate the terms and formalize the agreement.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Negotiate the rent, security deposit (typically 2-3 months' rent), and advance payment</li>
                      <li>Discuss the lease duration and conditions for renewal</li>
                      <li>Clarify responsibilities for repairs and maintenance</li>
                      <li>Sign a proper rental agreement that includes all negotiated terms</li>
                      <li>Consider using our Legal Support service to review the agreement before signing</li>
                    </ul>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate("/legal-support")}
                    >
                      Legal Agreement Review
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step5">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">5</div>
                    <span>Move In & Maintain Documentation</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8">
                    <p className="mb-4">Important steps when moving in and maintaining a good tenancy.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Document the property condition with photos before moving in</li>
                      <li>Get receipts for all payments including rent, security deposit, and advance</li>
                      <li>Transfer utility connections or establish payment arrangements</li>
                      <li>Keep a copy of your rental agreement and all payment records</li>
                      <li>Inform the owner promptly about any maintenance issues</li>
                      <li>Follow all building rules and maintain good relations with neighbors</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Special Considerations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Bachelor Rentals
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Use our bachelor-friendly filter to find properties that specifically welcome bachelor tenants, 
                    avoiding rejection based on marital status.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Home className="h-4 w-4 mr-2" />
                    Family Accommodations
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Look for properties marked as family-appropriate for spaces designed with children's safety 
                    and family needs in mind.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    Women-Only Options
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Our women-only filter highlights properties with enhanced security features and accommodations 
                    specifically for women tenants.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => navigate("/properties?category=rent")}
                className="mr-4"
              >
                <Building2 className="mr-2 h-4 w-4" />
                Browse Rentals
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/area-snapshot")}
              >
                Check Areas
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RentingGuide;
