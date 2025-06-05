
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Video, Drone, Edit, Star, Clock } from "lucide-react";

const Photography = () => {
  const packages = [
    {
      title: "Basic Package",
      price: "BDT 8,000",
      description: "Essential photography for standard listings",
      features: [
        "15-20 high-quality photos",
        "Professional editing",
        "Same day delivery",
        "Multiple angles per room"
      ],
      icon: <Camera className="h-8 w-8 text-nirman-gold" />
    },
    {
      title: "Premium Package",
      price: "BDT 15,000",
      description: "Complete visual package with video tour",
      features: [
        "25-30 professional photos",
        "360° virtual tour",
        "2-3 minute video walkthrough",
        "Aerial drone shots (if applicable)",
        "Professional editing & color correction"
      ],
      icon: <Video className="h-8 w-8 text-nirman-gold" />,
      popular: true
    },
    {
      title: "Luxury Package",
      price: "BDT 25,000",
      description: "Premium production for high-end properties",
      features: [
        "40+ premium photos",
        "Professional video production",
        "Drone aerial photography",
        "Twilight photography",
        "Virtual staging options",
        "Social media ready content"
      ],
      icon: <Drone className="h-8 w-8 text-nirman-gold" />
    }
  ];

  return (
    <PageLayout title="Professional Photography" subtitle="Showcase your property with stunning visuals that attract buyers">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <Card key={index} className={`relative ${pkg.popular ? 'ring-2 ring-nirman-gold' : ''}`}>
              {pkg.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-nirman-gold">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {pkg.icon}
                </div>
                <CardTitle>{pkg.title}</CardTitle>
                <div className="text-2xl font-bold text-nirman-navy">{pkg.price}</div>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-nirman-gold rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-500" />
                Why Professional Photography Matters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Increase Property Views</h4>
                <p className="text-sm text-muted-foreground">Professional photos can increase online views by up to 118%</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Faster Sales</h4>
                <p className="text-sm text-muted-foreground">Properties with professional photos sell 32% faster on average</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Better Pricing</h4>
                <p className="text-sm text-muted-foreground">High-quality visuals help justify your asking price</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-nirman-gold" />
                Our Photography Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-nirman-gold/10 rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                <div>
                  <h4 className="font-semibold">Property Assessment</h4>
                  <p className="text-sm text-muted-foreground">We visit and plan the best shots for your property</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-nirman-gold/10 rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                <div>
                  <h4 className="font-semibold">Professional Shoot</h4>
                  <p className="text-sm text-muted-foreground">Capture stunning photos and videos using professional equipment</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-nirman-gold/10 rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                <div>
                  <h4 className="font-semibold">Post-Production</h4>
                  <p className="text-sm text-muted-foreground">Professional editing and color correction</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-nirman-gold/10 rounded-full flex items-center justify-center text-sm font-semibold">4</div>
                <div>
                  <h4 className="font-semibold">Delivery</h4>
                  <p className="text-sm text-muted-foreground">High-resolution files delivered within 24-48 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center bg-gradient-to-r from-nirman-navy to-nirman-gold/20 p-8 rounded-lg text-white">
          <h2 className="text-2xl font-semibold mb-4">Book Your Property Photoshoot Today</h2>
          <p className="mb-6 opacity-90">
            Professional photography is an investment that pays for itself through faster sales and better prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              View Portfolio
            </Button>
            <Button size="lg" className="bg-white text-nirman-navy hover:bg-gray-100">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Photography;
