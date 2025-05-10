
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PricingFeesProps {
  onLogoClick?: () => void;
}

const PricingFees = ({ onLogoClick }: PricingFeesProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header onLogoClick={onLogoClick} />
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Pricing & Fees</h1>
          <p className="text-muted-foreground mb-8">
            Transparent pricing structure with no hidden charges
          </p>
          
          <div className="grid gap-8">
            <div className="bg-muted/50 rounded-lg p-6 text-center">
              <h2 className="text-xl font-medium mb-2">Our Commitment to Fairness</h2>
              <p>
                At Nirman360, we believe in complete transparency. You only pay when you get results, 
                with no upfront listing fees or hidden charges.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-primary/20">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-lg">For Property Seekers</CardTitle>
                  <CardDescription>Pay only to unlock contact</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-3xl font-bold mb-1">৳49-99</p>
                  <p className="text-sm text-muted-foreground mb-6">per contact unlock</p>
                  <ul className="space-y-2 text-left text-sm mb-6">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Browse all property listings for free</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Use all search filters at no cost</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>View detailed property information</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Unlock verified owner contact info</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Book property visits</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => navigate("/properties")}
                  >
                    Browse Properties
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-primary">
                <CardHeader className="text-center bg-primary/5 pb-2">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Most Popular</div>
                  <CardTitle className="text-lg">For Property Owners</CardTitle>
                  <CardDescription>List for free, pay only on success</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-3xl font-bold mb-1">1%</p>
                  <p className="text-sm text-muted-foreground mb-6">of property value on successful deal</p>
                  <ul className="space-y-2 text-left text-sm mb-6">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Free property listing</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Free verification process</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Verified buyer inquiries only</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Deal facilitation support</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Pay only after successful transaction</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => navigate("/post-property")}
                  >
                    List Your Property
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-primary/20">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-lg">Legal Support</CardTitle>
                  <CardDescription>Professional assistance when needed</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-3xl font-bold mb-1">৳499+</p>
                  <p className="text-sm text-muted-foreground mb-6">based on service required</p>
                  <ul className="space-y-2 text-left text-sm mb-6">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Document verification</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Legal consultation</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Agreement drafting assistance</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Title check services</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Registration guidance</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => navigate("/legal-support")}
                  >
                    View Legal Services
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Detailed Fee Structure</h2>
            
            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Service</TableHead>
                      <TableHead>Fee</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Property Listing</TableCell>
                      <TableCell>Free</TableCell>
                      <TableCell>No charges for listing your property</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Property Verification</TableCell>
                      <TableCell>Free</TableCell>
                      <TableCell>Mandatory for all listings</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Contact Unlock Fee (Buyers)</TableCell>
                      <TableCell>৳49-99</TableCell>
                      <TableCell>Varies based on property value</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Success Fee (Sellers)</TableCell>
                      <TableCell>1%</TableCell>
                      <TableCell>Of total property value, paid after successful deal</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Professional Photography</TableCell>
                      <TableCell>৳999</TableCell>
                      <TableCell>Optional service for better listing presentation</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Basic Legal Document Check</TableCell>
                      <TableCell>৳499</TableCell>
                      <TableCell>Verification of basic property documents</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Comprehensive Title Check</TableCell>
                      <TableCell>৳1,499</TableCell>
                      <TableCell>Thorough investigation of property title</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Legal Consultation</TableCell>
                      <TableCell>৳999/hour</TableCell>
                      <TableCell>With experienced property lawyers</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Featured Listing</TableCell>
                      <TableCell>৳799/week</TableCell>
                      <TableCell>Optional promotion for faster results</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Comparison with Traditional Agents</h2>
            
            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Feature</TableHead>
                      <TableHead>Nirman360</TableHead>
                      <TableHead>Traditional Agents</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Listing Fee</TableCell>
                      <TableCell className="text-green-500">Free</TableCell>
                      <TableCell className="text-red-500">Often charges upfront</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Success Commission</TableCell>
                      <TableCell className="text-green-500">1% of property value</TableCell>
                      <TableCell className="text-red-500">2-3% of property value</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Verification Process</TableCell>
                      <TableCell className="text-green-500 flex items-center">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Thorough verification
                      </TableCell>
                      <TableCell className="text-red-500 flex items-center">
                        <XCircle className="h-4 w-4 mr-2" />
                        Minimal or none
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Transparency</TableCell>
                      <TableCell className="text-green-500 flex items-center">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Full price transparency
                      </TableCell>
                      <TableCell className="text-red-500 flex items-center">
                        <XCircle className="h-4 w-4 mr-2" />
                        Often has hidden charges
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Digital Tools</TableCell>
                      <TableCell className="text-green-500 flex items-center">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Advanced platform with AI
                      </TableCell>
                      <TableCell className="text-red-500 flex items-center">
                        <XCircle className="h-4 w-4 mr-2" />
                        Limited or basic
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Legal Support</TableCell>
                      <TableCell className="text-green-500 flex items-center">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Integrated services
                      </TableCell>
                      <TableCell className="text-red-500 flex items-center">
                        <XCircle className="h-4 w-4 mr-2" />
                        Usually outsourced
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <div className="flex justify-center mt-8">
              <Button 
                onClick={() => navigate("/post-property")}
                className="mr-4"
              >
                List Your Property
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate("/seller-guide")}
              >
                Read Seller's Guide
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingFees;
