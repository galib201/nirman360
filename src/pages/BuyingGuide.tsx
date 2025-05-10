
import Header from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Building, User, Home, CheckCircle } from "lucide-react";

interface BuyingGuideProps {
  onLogoClick?: () => void;
}

const BuyingGuide = ({ onLogoClick }: BuyingGuideProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header onLogoClick={onLogoClick} />
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Buying Guide</h1>
          <p className="text-muted-foreground mb-8">
            Everything you need to know about buying property in Bangladesh
          </p>
          
          <div className="grid gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Why Buy with Nirman360?</h3>
                    <p className="text-muted-foreground">
                      At Nirman360, we ensure every property is 100% verified, giving you peace of mind. 
                      Our AI-powered search helps you find the perfect property, while our Area Snapshot provides 
                      crucial information about the neighborhood.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <h2 className="text-xl font-semibold mt-4 mb-2">Step-by-Step Buying Process</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="step1">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">1</div>
                    <span>Determine Your Budget</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8">
                    <p className="mb-4">Before you start looking for properties, you should determine how much you can afford to spend.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Calculate your savings for the down payment (typically 20-30% in Bangladesh)</li>
                      <li>Assess your loan eligibility if you're planning to take a home loan</li>
                      <li>Consider additional costs like registration fees, utility deposits, and potential renovation expenses</li>
                      <li>Use our budget calculator to get a realistic figure based on your income and savings</li>
                    </ul>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate("/nirman-ai")}
                    >
                      Use Nirman AI Budget Planner
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step2">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">2</div>
                    <span>Research Areas & Property Types</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8">
                    <p className="mb-4">Exploring different areas and property types will help you make an informed decision.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Use our Area Snapshot to compare neighborhoods based on amenities, safety, and property values</li>
                      <li>Consider your lifestyle needs: proximity to work, schools, transportation, etc.</li>
                      <li>Attend property exhibitions and open houses to get a feel for different property types</li>
                      <li>Check the land use patterns and future development plans for the area</li>
                    </ul>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate("/area-snapshot")}
                    >
                      Explore Area Snapshot
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step3">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">3</div>
                    <span>Visit Properties & Verify Documents</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8">
                    <p className="mb-4">Always visit properties in person and verify all documents before proceeding.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Book visits through our platform to see properties that interest you</li>
                      <li>Check for RAJUK/city corporation approval, land documents, and utility connections</li>
                      <li>Verify the seller's ownership through the original deed and mutation documents</li>
                      <li>Consider getting a professional property inspection for structural issues</li>
                      <li>Use our Legal Support service for document verification</li>
                    </ul>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate("/legal-support")}
                    >
                      Learn About Our Legal Support
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step4">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">4</div>
                    <span>Negotiate & Make an Offer</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8">
                    <p className="mb-4">After finding the right property, it's time to negotiate and make an offer.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Research comparable property prices in the area</li>
                      <li>Consider the property condition and any repairs needed</li>
                      <li>Negotiate the terms including price, payment schedule, and possession date</li>
                      <li>Draft a baina (booking) agreement to secure the property</li>
                      <li>Pay a booking amount (typically 10% of the property value)</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step5">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">5</div>
                    <span>Complete the Purchase</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8">
                    <p className="mb-4">The final steps to complete your property purchase.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Draft the final deed of sale (usually done by a lawyer)</li>
                      <li>Pay the remaining amount as per the agreed schedule</li>
                      <li>Register the property at the sub-registry office</li>
                      <li>Pay registration fees and taxes (typically 7-10% of the property value)</li>
                      <li>Complete mutation to update government records</li>
                      <li>Transfer utility connections to your name</li>
                    </ul>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate("/legal-support")}
                    >
                      Get Legal Assistance
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Common Pitfalls to Avoid</h2>
            
            <div className="bg-destructive/10 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Be Aware of These Common Issues:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Incomplete or forged documents</li>
                <li>Undisclosed disputes or multiple ownership claims</li>
                <li>Unauthorized constructions without proper approvals</li>
                <li>Hidden costs and last-minute price changes</li>
                <li>Properties with encumbrances or mortgage</li>
                <li>Not verifying the zoning or land use regulations</li>
              </ul>
              <p className="mt-4">
                Always use Nirman360's verification system and Legal Support services to avoid these issues.
              </p>
            </div>
            
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => navigate("/properties?category=buy")}
                className="mr-4"
              >
                <Building className="mr-2 h-4 w-4" />
                Browse Properties
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/legal-support")}
              >
                <ShieldCheck className="mr-2 h-4 w-4" />
                Legal Support
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BuyingGuide;
