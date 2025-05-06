
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Upload, FileCheck, Scale, FileText, PoundSterling } from "lucide-react";
import { toast } from "sonner";

const LegalSupport = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<string>("deed-verification");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Simulate file upload
      setIsSubmitting(true);
      
      setTimeout(() => {
        setUploadedFile(file.name);
        setIsSubmitting(false);
        toast.success("Document uploaded successfully!");
      }, 1500);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Your legal consultation request has been submitted!");
      navigate("/dashboard");
    }, 2000);
  };
  
  const simulatePayment = () => {
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Payment successful! Your legal consultation is booked.");
      navigate("/dashboard");
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-background py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-display font-semibold mb-6">
            Legal Support Services
          </h1>
          
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Nirman360 offers professional legal support services to ensure your real estate transactions
            are secure and compliant. Our team of legal experts will guide you through the process.
          </p>
          
          <Tabs 
            defaultValue="deed-verification" 
            className="w-full"
            value={selectedTab}
            onValueChange={setSelectedTab}
          >
            <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-8">
              <TabsTrigger value="deed-verification">Deed Verification</TabsTrigger>
              <TabsTrigger value="legal-consultation">Legal Consultation</TabsTrigger>
              <TabsTrigger value="premium-services">Premium Services</TabsTrigger>
            </TabsList>
            
            <TabsContent value="deed-verification">
              <Card className="border-2 border-muted">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-nirman-gold" />
                    Deed Verification Service
                  </CardTitle>
                  <CardDescription>
                    Upload your property deed documents for verification by our legal experts.
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center">
                      {uploadedFile ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <FileCheck size={24} />
                          <span>{uploadedFile}</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">Upload Your Documents</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Drag and drop your files here or click to browse
                          </p>
                          <Input 
                            type="file"
                            className="max-w-sm"
                            onChange={handleFileUpload}
                          />
                        </>
                      )}
                    </div>
                  </div>
                  
                  <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                        <Input id="name" placeholder="Enter your full name" required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                        <Input id="phone" placeholder="Enter your phone number" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="property-address" className="text-sm font-medium">Property Address</label>
                      <Input id="property-address" placeholder="Enter the property address" required />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Additional Information</label>
                      <Textarea 
                        id="message" 
                        placeholder="Any specific information or questions about the deed..." 
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Processing..." : "Submit for Verification"}
                    </Button>
                  </form>
                </CardContent>
                
                <CardFooter className="flex flex-col text-sm text-muted-foreground">
                  <p className="mb-2">
                    <strong>Free Service:</strong> Basic verification is free for Nirman360 users.
                  </p>
                  <p>
                    Our legal team will review your documents and get back to you within 48 hours.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="legal-consultation">
              <Card className="border-2 border-muted">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-nirman-gold" />
                    Legal Consultation Service
                  </CardTitle>
                  <CardDescription>
                    Book a consultation with our legal experts for your property-related matters.
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Choose Consultation Type</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-nirman-lightblue cursor-pointer transition-colors">
                          <div className="mt-1">
                            <input type="radio" name="consultation-type" defaultChecked />
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Basic Consultation</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              30-minute video call with a legal advisor
                            </p>
                            <p className="font-semibold">BDT 499</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-nirman-lightblue cursor-pointer transition-colors">
                          <div className="mt-1">
                            <input type="radio" name="consultation-type" />
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Standard Consultation</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              60-minute video call with a senior legal advisor
                            </p>
                            <p className="font-semibold">BDT 999</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-nirman-lightblue cursor-pointer transition-colors">
                          <div className="mt-1">
                            <input type="radio" name="consultation-type" />
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Premium Consultation</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              90-minute video call with a legal expert + document review
                            </p>
                            <p className="font-semibold">BDT 1,999</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Your Details</h3>
                      
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="your-name" className="text-sm font-medium">Your Name</label>
                          <Input id="your-name" placeholder="Enter your full name" required />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="your-email" className="text-sm font-medium">Email Address</label>
                          <Input id="your-email" type="email" placeholder="Enter your email address" required />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="your-phone" className="text-sm font-medium">Phone Number</label>
                          <Input id="your-phone" placeholder="Enter your phone number" required />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="consultation-reason" className="text-sm font-medium">Reason for Consultation</label>
                          <Textarea 
                            id="consultation-reason" 
                            placeholder="Briefly describe your legal concerns..." 
                            className="min-h-[100px]"
                            required
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between flex-col md:flex-row gap-4">
                  <p className="text-sm text-muted-foreground">
                    You will receive a confirmation email with meeting details after payment.
                  </p>
                  <Button onClick={simulatePayment} disabled={isSubmitting} className="min-w-[200px]">
                    {isSubmitting ? "Processing..." : "Pay Now & Book"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="premium-services">
              <Card className="border-2 border-muted">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PoundSterling className="h-5 w-5 text-nirman-gold" />
                    Premium Legal Services
                  </CardTitle>
                  <CardDescription>
                    Comprehensive legal support for complex real estate transactions.
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader className="bg-gradient-premium text-white">
                        <CardTitle className="text-xl">Title Investigation</CardTitle>
                        <CardDescription className="text-white text-opacity-80">
                          Thorough title verification
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className="mb-4 text-sm text-muted-foreground">
                          Our legal experts will conduct a comprehensive investigation 
                          of the property title to ensure it is free from disputes.
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <FileCheck className="h-4 w-4 text-green-600" />
                            <span>Document verification</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <FileCheck className="h-4 w-4 text-green-600" />
                            <span>Land records check</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <FileCheck className="h-4 w-4 text-green-600" />
                            <span>Legal opinion report</span>
                          </li>
                        </ul>
                        <div className="mt-6 text-center">
                          <p className="font-semibold text-2xl">BDT 4,999</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" variant="outline" onClick={simulatePayment}>
                          Book Service
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="bg-gradient-premium text-white">
                        <CardTitle className="text-xl">Contract Review</CardTitle>
                        <CardDescription className="text-white text-opacity-80">
                          Expert contract analysis
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className="mb-4 text-sm text-muted-foreground">
                          Our legal team will review and analyze your real estate contracts
                          to ensure your interests are protected.
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <FileCheck className="h-4 w-4 text-green-600" />
                            <span>Contract analysis</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <FileCheck className="h-4 w-4 text-green-600" />
                            <span>Terms negotiation</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <FileCheck className="h-4 w-4 text-green-600" />
                            <span>Legal recommendation</span>
                          </li>
                        </ul>
                        <div className="mt-6 text-center">
                          <p className="font-semibold text-2xl">BDT 3,499</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" variant="outline" onClick={simulatePayment}>
                          Book Service
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="bg-gradient-premium text-white">
                        <CardTitle className="text-xl">Full Transaction Support</CardTitle>
                        <CardDescription className="text-white text-opacity-80">
                          End-to-end legal assistance
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className="mb-4 text-sm text-muted-foreground">
                          Complete legal support throughout your property transaction process,
                          from initial agreement to final registration.
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <FileCheck className="h-4 w-4 text-green-600" />
                            <span>Contract preparation</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <FileCheck className="h-4 w-4 text-green-600" />
                            <span>Registration assistance</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <FileCheck className="h-4 w-4 text-green-600" />
                            <span>Dedicated legal advisor</span>
                          </li>
                        </ul>
                        <div className="mt-6 text-center">
                          <p className="font-semibold text-2xl">BDT 9,999</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" variant="outline" onClick={simulatePayment}>
                          Book Service
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-muted-foreground text-center max-w-xl">
                    Our premium legal services are designed for complex real estate transactions.
                    For custom legal requirements, please contact us directly for a tailored quote.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LegalSupport;
