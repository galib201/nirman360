import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Camera, Tag, Users, FileCheck } from "lucide-react";

const SellerGuide = () => {
  const steps = [
    {
      icon: <FileCheck className="h-8 w-8 text-nirman-gold" />,
      title: "Prepare Documents",
      description: "Gather all necessary legal documents including title deed, tax receipts, and approvals."
    },
    {
      icon: <Tag className="h-8 w-8 text-nirman-gold" />,
      title: "Set the Right Price",
      description: "Research market rates and price your property competitively for a quick sale."
    },
    {
      icon: <Camera className="h-8 w-8 text-nirman-gold" />,
      title: "Create Great Listing",
      description: "Take high-quality photos and write a compelling description to attract buyers."
    },
    {
      icon: <Users className="h-8 w-8 text-nirman-gold" />,
      title: "Manage Inquiries",
      description: "Respond to buyer inquiries promptly and schedule property visits efficiently."
    }
  ];

  return (
    <PageLayout title="Seller's Guide" subtitle="Maximize your property's value with our comprehensive selling guide">
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
              <CardTitle>Required Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Original title deed (দলিল)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Updated land survey (খতিয়ান)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Property tax receipts</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Building approval plans</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">No objection certificate</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selling Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Price competitively based on market research</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Take professional quality photos</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Be honest about property condition</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Respond to inquiries quickly</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Consider minor repairs for better value</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default SellerGuide;
