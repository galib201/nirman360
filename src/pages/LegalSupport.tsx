
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Scale, 
  FileText, 
  Shield, 
  Clock, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin,
  Star,
  Award,
  Users,
  Briefcase
} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { toast } from "sonner";

const LegalSupport = () => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    description: ""
  });

  const legalServices = [
    {
      id: "property-verification",
      title: "Property Verification",
      price: "BDT 5,000",
      description: "Complete document verification and title search",
      features: ["Title deed verification", "Legal clearance certificate", "Encumbrance check", "Court case verification"],
      duration: "3-5 business days"
    },
    {
      id: "contract-review",
      title: "Contract Review",
      price: "BDT 3,000",
      description: "Professional review of sale/purchase agreements",
      features: ["Contract terms analysis", "Risk assessment", "Legal advice", "Amendment suggestions"],
      duration: "1-2 business days"
    },
    {
      id: "registration-assistance",
      title: "Registration Assistance",
      price: "BDT 8,000",
      description: "Complete property registration support",
      features: ["Document preparation", "Registration filing", "Government liaison", "Completion follow-up"],
      duration: "7-10 business days"
    },
    {
      id: "dispute-resolution",
      title: "Dispute Resolution",
      price: "BDT 15,000",
      description: "Legal representation for property disputes",
      features: ["Case analysis", "Legal representation", "Negotiation support", "Court proceedings"],
      duration: "Varies by case"
    }
  ];

  const lawyers = [
    {
      id: "1",
      name: "Advocate Rashida Khan",
      specialization: "Property Law",
      experience: "15 years",
      rating: 4.9,
      cases: 500,
      location: "Dhaka High Court",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: "2",
      name: "Barrister Ahmed Hassan",
      specialization: "Real Estate Law",
      experience: "12 years",
      rating: 4.8,
      cases: 350,
      location: "Supreme Court",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: "3",
      name: "Advocate Fatima Rahman",
      specialization: "Contract Law",
      experience: "10 years",
      rating: 4.7,
      cases: 280,
      location: "Chittagong Bar",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
    }
  ];

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    const service = legalServices.find(s => s.id === serviceId);
    setContactForm(prev => ({ ...prev, service: service?.title || "" }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.phone || !contactForm.service) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Your request has been submitted. A legal expert will contact you within 24 hours.");
    setContactForm({ name: "", email: "", phone: "", service: "", description: "" });
  };

  return (
    <PageLayout 
      title="Legal Support" 
      subtitle="Expert legal assistance for all your property transactions and disputes"
    >
      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="services">Legal Services</TabsTrigger>
          <TabsTrigger value="lawyers">Our Lawyers</TabsTrigger>
          <TabsTrigger value="contact">Get Help</TabsTrigger>
        </TabsList>
        
        <TabsContent value="services" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {legalServices.map((service) => (
              <Card 
                key={service.id} 
                className={`cursor-pointer transition-all ${
                  selectedService === service.id ? 'ring-2 ring-nirman-navy' : ''
                }`}
                onClick={() => handleServiceSelect(service.id)}
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{service.title}</span>
                    <Badge variant="secondary">{service.price}</Badge>
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      {service.duration}
                    </div>
                    
                    <div>
                      <p className="font-medium mb-2">Includes:</p>
                      <ul className="space-y-1">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className="w-full"
                    variant={selectedService === service.id ? "default" : "outline"}
                  >
                    {selectedService === service.id ? "Selected" : "Select Service"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="bg-muted rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Shield className="h-8 w-8 text-nirman-gold flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Why Choose Our Legal Services?</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Experienced lawyers specializing in Bangladesh property law</li>
                  <li>• Fixed pricing with no hidden costs</li>
                  <li>• Quick turnaround times</li>
                  <li>• 100% confidential and secure</li>
                  <li>• Money-back guarantee if not satisfied</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="lawyers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lawyers.map((lawyer) => (
              <Card key={lawyer.id}>
                <CardHeader className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src={lawyer.image} 
                      alt={lawyer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle>{lawyer.name}</CardTitle>
                  <CardDescription>{lawyer.specialization}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-medium">{lawyer.experience}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rating</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                      <span className="font-medium">{lawyer.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Cases Handled</span>
                    <span className="font-medium">{lawyer.cases}+</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{lawyer.location}</span>
                  </div>
                </CardContent>
                
                <CardFooter className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Request Legal Assistance</CardTitle>
                <CardDescription>
                  Fill out the form below and one of our legal experts will contact you within 24 hours.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Full Name *</label>
                    <Input
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Email *</label>
                    <Input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Phone *</label>
                    <Input
                      value={contactForm.phone}
                      onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Service Required *</label>
                    <select 
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={contactForm.service}
                      onChange={(e) => setContactForm(prev => ({ ...prev, service: e.target.value }))}
                      required
                    >
                      <option value="">Select a service</option>
                      {legalServices.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title} - {service.price}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Case Description</label>
                    <Textarea
                      value={contactForm.description}
                      onChange={(e) => setContactForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your legal requirement in detail..."
                      rows={4}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Submit Request
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Legal Help</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Need immediate legal assistance? Call our emergency hotline.
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-red-600" />
                    <span className="font-semibold text-lg">+880 1711-LEGAL (534250)</span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Available 24/7 for urgent property legal matters
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Free Consultation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get a free 15-minute consultation to understand your legal options.
                  </p>
                  <Button className="w-full" variant="outline">
                    Book Free Consultation
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Legal Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4" />
                    <a href="#" className="text-blue-600 hover:underline">Property Law Guide</a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4" />
                    <a href="#" className="text-blue-600 hover:underline">Contract Templates</a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4" />
                    <a href="#" className="text-blue-600 hover:underline">Legal FAQs</a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default LegalSupport;
