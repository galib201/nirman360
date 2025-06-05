
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Search, FileText, HandHeart, Home } from "lucide-react";

const RentingGuide = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8 text-nirman-gold" />,
      title: "Search & Filter",
      description: "Use our advanced filters to find properties that match your budget, location, and preferences."
    },
    {
      icon: <Home className="h-8 w-8 text-nirman-gold" />,
      title: "Visit Properties",
      description: "Schedule visits to shortlisted properties and inspect them thoroughly."
    },
    {
      icon: <FileText className="h-8 w-8 text-nirman-gold" />,
      title: "Review Agreement",
      description: "Carefully review the rental agreement terms, conditions, and payment schedule."
    },
    {
      icon: <HandHeart className="h-8 w-8 text-nirman-gold" />,
      title: "Move In",
      description: "Complete documentation, pay security deposit, and move into your new home."
    }
  ];

  return (
    <PageLayout title="Property Renting Guide" subtitle="Everything you need to know about renting property in Bangladesh">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {step.icon}
                </div>
                <CardTitle className="text-lg">Step {index + 1}</CardTitle>
                <CardDescription className="font-medium">{step.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Renter's Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Verify landlord's ownership documents</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Check utility connections and bills</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Inspect property condition thoroughly</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Understand all terms and conditions</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Know your rights as a tenant</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Rental Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="font-medium text-sm">Security Deposit:</span>
                <span className="text-sm text-muted-foreground ml-2">Usually 2-3 months rent</span>
              </div>
              <div>
                <span className="font-medium text-sm">Advance Rent:</span>
                <span className="text-sm text-muted-foreground ml-2">1-2 months rent in advance</span>
              </div>
              <div>
                <span className="font-medium text-sm">Utilities:</span>
                <span className="text-sm text-muted-foreground ml-2">May or may not be included</span>
              </div>
              <div>
                <span className="font-medium text-sm">Maintenance:</span>
                <span className="text-sm text-muted-foreground ml-2">Clarify responsibilities</span>
              </div>
              <div>
                <span className="font-medium text-sm">Notice Period:</span>
                <span className="text-sm text-muted-foreground ml-2">Usually 1-2 months notice</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default RentingGuide;
