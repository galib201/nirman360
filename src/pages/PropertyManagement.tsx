
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, Users, Wrench, Calculator, Shield, Clock } from "lucide-react";

const PropertyManagement = () => {
  const services = [
    {
      icon: <Building className="h-8 w-8 text-nirman-gold" />,
      title: "Tenant Management",
      description: "Complete tenant screening, lease management, and rent collection services.",
      price: "8% of monthly rent",
      features: ["Tenant screening", "Lease preparation", "Rent collection", "Tenant communication"]
    },
    {
      icon: <Wrench className="h-8 w-8 text-nirman-gold" />,
      title: "Maintenance Services",
      description: "24/7 maintenance support and regular property inspections.",
      price: "Cost + 15% fee",
      features: ["Emergency repairs", "Regular maintenance", "Vendor management", "Property inspections"]
    },
    {
      icon: <Calculator className="h-8 w-8 text-nirman-gold" />,
      title: "Financial Management",
      description: "Complete financial tracking and reporting for your property investments.",
      price: "BDT 5,000/month",
      features: ["Income tracking", "Expense management", "Tax preparation", "Monthly reports"]
    }
  ];

  return (
    <PageLayout title="Property Management Services" subtitle="Professional management for your property investments">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index}>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
                <Badge variant="secondary" className="mx-auto">{service.price}</Badge>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-nirman-gold rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Why Choose Our Property Management?</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Shield className="h-12 w-12 text-nirman-gold mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Trusted & Reliable</h3>
              <p className="text-sm text-muted-foreground">Licensed and insured property management with years of experience</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-nirman-gold mx-auto mb-4" />
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Round-the-clock emergency support for tenants and property owners</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-nirman-gold mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Proven Results</h3>
              <p className="text-sm text-muted-foreground">Higher rental yields and lower vacancy rates for our clients</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center bg-muted p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let us handle your property while you enjoy passive income. Contact us for a free consultation.
          </p>
          <Button size="lg" className="bg-nirman-gold hover:bg-nirman-gold/90">
            Get Free Consultation
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default PropertyManagement;
