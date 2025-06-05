
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Home, FileText, Calculator, Key } from "lucide-react";

const BuyingGuide = () => {
  const steps = [
    {
      icon: <Calculator className="h-8 w-8 text-nirman-gold" />,
      title: "Determine Your Budget",
      description: "Calculate how much you can afford including down payment, monthly payments, and additional costs."
    },
    {
      icon: <Home className="h-8 w-8 text-nirman-gold" />,
      title: "Choose Location & Type",
      description: "Research neighborhoods, amenities, and decide on the type of property that suits your needs."
    },
    {
      icon: <FileText className="h-8 w-8 text-nirman-gold" />,
      title: "Legal Verification",
      description: "Verify property documents, clear title, and ensure all legal requirements are met."
    },
    {
      icon: <Key className="h-8 w-8 text-nirman-gold" />,
      title: "Complete Purchase",
      description: "Finalize the deal, complete registration, and get your keys to your new property."
    }
  ];

  return (
    <PageLayout title="Property Buying Guide" subtitle="Your complete guide to buying property in Bangladesh">
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

        <Card>
          <CardHeader>
            <CardTitle>Important Considerations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Financial Planning</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Consider all costs including registration, legal fees, and taxes
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Keep emergency funds for unexpected expenses
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Get pre-approved for loans if financing
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Legal Requirements</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Verify property ownership and clear title
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Check for any pending legal cases
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Ensure proper building approvals
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default BuyingGuide;
