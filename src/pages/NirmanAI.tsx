
import PageLayout from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NirmanBot from "@/components/NirmanBot";
import { Bot, MessageCircle, Zap, Shield, Clock } from "lucide-react";

const NirmanAI = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Instant Responses",
      description: "Get immediate answers to your real estate questions 24/7"
    },
    {
      icon: Zap,
      title: "Smart Recommendations",
      description: "AI-powered property suggestions based on your preferences"
    },
    {
      icon: Shield,
      title: "Reliable Information",
      description: "Accurate and up-to-date real estate data and insights"
    },
    {
      icon: Clock,
      title: "Time Saving",
      description: "Find what you need quickly without browsing through hundreds of listings"
    }
  ];

  return (
    <PageLayout 
      title="NirmanAI Assistant" 
      description="Your intelligent real estate companion"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Information */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Bot className="h-6 w-6 text-nirman-navy" />
              Meet NirmanBot
            </h2>
            <p className="text-muted-foreground mb-6">
              Your intelligent virtual assistant for all real estate needs. Get instant answers, 
              property recommendations, legal guidance, and market insights powered by AI.
            </p>
          </div>

          <div className="grid gap-4">
            <h3 className="text-lg font-medium">What NirmanBot Can Help You With:</h3>
            {features.map((feature, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start gap-3">
                  <feature.icon className="h-5 w-5 text-nirman-navy mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-nirman-lightblue border-none">
            <h3 className="font-semibold text-lg mb-3">Try These Sample Questions:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-nirman-navy">•</span>
                <span>"Find me a pet-friendly 2BHK in Dhanmondi"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-nirman-navy">•</span>
                <span>"What legal documents do I need for buying property?"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-nirman-navy">•</span>
                <span>"Tell me about Gulshan area amenities"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-nirman-navy">•</span>
                <span>"Help me plan my budget for a 3BHK apartment"</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Right Column - Chatbot */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Chat with NirmanBot</h3>
            <NirmanBot />
          </Card>

          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-800">Privacy & Security</span>
            </div>
            <p className="text-sm text-green-700">
              Your conversations are secure and private. We use the information only to provide 
              better assistance and recommendations.
            </p>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default NirmanAI;
