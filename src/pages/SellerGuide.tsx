
import Header from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Building, Home, User, CheckCircle, Camera } from "lucide-react";

interface SellerGuideProps {
  onLogoClick?: () => void;
}

const SellerGuide = ({ onLogoClick }: SellerGuideProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header onLogoClick={onLogoClick} />
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Seller's Guide</h1>
          <p className="text-muted-foreground mb-8">
            How to effectively sell your property on Nirman360
          </p>
          
          <div className="grid gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Why Sell with Nirman360?</h3>
                    <p className="text-muted-foreground">
                      Our verification process builds trust with buyers, and you only pay a small 1% commission after a 
                      successful sale—much lower than traditional agent fees of 2-3%. Your listing reaches serious, 
                      verified buyers, making the process faster and more reliable.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <h2 className="text-xl font-semibold mt-4 mb-2">Step-by-Step Selling Process</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="step1">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">1</div>
                    <span>Prepare Your Documents</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8">
                    <p className="mb-4">Before listing your property, gather all necessary documents.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Original deed of the property (dalil)</li>
                      <li>Mutation documents (namjari/porcha)</li>
                      <li>Property tax receipts for the last few years</li>
                      <li>Utility bill receipts to prove active connections</li>
                      <li>Approved building plan from RAJUK or relevant authority (for buildings)</li>
                      <li>NOC (No Objection Certificate) if applicable</li>
                      <li>Personal identification documents</li>
                    </ul>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate("/legal-support")}
                    >
                      Get Document Verification
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step2">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">2</div>
                    <span>Prepare Your Property</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8">
                    <p className="mb-4">Make your property more appealing to potential buyers.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Clean and declutter all spaces to make them look spacious</li>
                      <li>Complete any minor repairs (leaky faucets, broken tiles, etc.)</li>
                      <li>Apply a fresh coat of paint if needed</li>
                      <li>Ensure good lighting in all rooms</li>
                      <li>Consider professional staging to highlight the property's potential</li>
                      <li>Prepare for professional photography</li>
                    </ul>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate("/post-property")}
                    >
                      Book Professional Photography
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step3">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">3</div>
                    <span>Set the Right Price</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8">
                    <p className="mb-4">Pricing your property correctly is crucial for a successful sale.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Research comparable properties in your area using our Area Snapshot</li>
                      <li>Consider the property's condition, age, and unique features</li>
                      <li>Factor in any recent improvements or renovations</li>
                      <li>Be realistic about market conditions</li>
                      <li>Set a competitive but fair price to attract serious buyers</li>
                    </ul>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate("/area-snapshot")}
                    >
                      Check Area Property Values
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step4">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">4</div>
                    <span>Create a Compelling Listing</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8">
                    <p className="mb-4">Make your listing stand out with great photos and detailed descriptions.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Use high-quality photos that showcase your property's best features</li>
                      <li>Write a detailed description highlighting key selling points</li>
                      <li>Mention nearby amenities, transportation options, and facilities</li>
                      <li>Be honest about any limitations or issues</li>
                      <li>Complete the verification process to earn the "Verified" badge</li>
                    </ul>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate("/post-property")}
                    >
                      Post Your Property
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step5">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">5</div>
                    <span>Handle Inquiries & Negotiations</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8">
                    <p className="mb-4">Be responsive and prepared to negotiate with potential buyers.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Respond promptly to inquiries through our messaging system</li>
                      <li>Be flexible with showing times to accommodate serious buyers</li>
                      <li>Prepare for negotiations by deciding on your bottom line in advance</li>
                      <li>Consider reasonable offers and be willing to compromise</li>
                      <li>Use our deal completion service for safer transactions</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step6">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">6</div>
                    <span>Complete the Sale</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8">
                    <p className="mb-4">Finalize the deal with proper documentation and legal procedures.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Draft a baina agreement (sale agreement) with the buyer</li>
                      <li>Accept the booking amount as per the agreement</li>
                      <li>Prepare for the final deed registration</li>
                      <li>Complete the registration process at the sub-registry office</li>
                      <li>Hand over all documents and property to the buyer</li>
                      <li>Pay the 1% success fee to Nirman360 after completion</li>
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
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Our Services for Sellers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Camera className="h-4 w-4 mr-2" />
                    Professional Photography
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Our professional photographers will capture your property in the best light, 
                    highlighting its strongest features to attract more buyers.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    Document Verification
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Our legal team can verify your property documents to ensure they're in order, 
                    making your listing more trustworthy for potential buyers.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Building className="h-4 w-4 mr-2" />
                    Featured Listings
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Get your property featured prominently on our platform to reach more potential buyers
                    and sell faster.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Deal Facilitation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Our team can help facilitate the deal between you and the buyer, 
                    ensuring a smooth transaction process.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => navigate("/post-property")}
                className="mr-4"
              >
                <Building className="mr-2 h-4 w-4" />
                List Your Property
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

export default SellerGuide;
