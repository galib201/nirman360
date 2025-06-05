
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Calendar, 
  Award, 
  Building, 
  Star,
  ExternalLink,
  CheckCircle
} from "lucide-react";
import { TrustedDeveloper } from "@/models";
import { toast } from "sonner";

interface DeveloperDetailsModalProps {
  developer: TrustedDeveloper | null;
  open: boolean;
  onClose: () => void;
}

const DeveloperDetailsModal = ({ developer, open, onClose }: DeveloperDetailsModalProps) => {
  if (!developer) return null;

  const handleCall = () => {
    toast.success(`Calling ${developer.name}...`);
    setTimeout(() => {
      toast.info(`Contact: ${developer.contactInfo.phone}`);
    }, 1000);
  };

  const handleEmail = () => {
    toast.success(`Opening email to ${developer.name}...`);
    window.open(`mailto:${developer.contactInfo.email}?subject=Property Development Inquiry`, '_blank');
  };

  const handleWebsite = () => {
    toast.success(`Opening ${developer.name}'s website...`);
    window.open(`https://${developer.contactInfo.website}`, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>{developer.name}</span>
            <div className="flex items-center text-amber-500">
              <Star className="fill-amber-500 h-5 w-5 mr-1" />
              <span>{developer.rating.toFixed(1)}</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hero Image */}
          <div className="h-64 overflow-hidden rounded-lg">
            <img 
              src={developer.image} 
              alt={developer.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Established</span>
                  <span className="font-medium">{developer.establishedYear}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{developer.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Completed Projects</span>
                  <span className="font-medium">{developer.completedProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <div className="flex items-center">
                    <Star className="fill-amber-500 text-amber-500 h-4 w-4 mr-1" />
                    <span className="font-medium">{developer.rating.toFixed(1)}/5.0</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{developer.contactInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{developer.contactInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{developer.contactInfo.website}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" onClick={handleCall} className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleEmail} className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </div>
                <Button size="sm" variant="outline" onClick={handleWebsite} className="w-full">
                  <Globe className="h-4 w-4 mr-2" />
                  Visit Website
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About {developer.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{developer.description}</p>
            </CardContent>
          </Card>

          {/* Specializations */}
          <Card>
            <CardHeader>
              <CardTitle>Specializations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {developer.specializations.map((spec, index) => (
                  <Badge key={index} variant="outline" className="bg-muted/50">
                    {spec}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          {developer.certifications.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Certifications & Awards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {developer.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sample Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <img 
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&auto=format&fit=crop&q=60" 
                    alt="Project 1" 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <p className="text-sm font-medium">Luxury Residential Complex</p>
                  <p className="text-xs text-muted-foreground">Completed 2023 • 50 Units</p>
                </div>
                <div className="space-y-2">
                  <img 
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&auto=format&fit=crop&q=60" 
                    alt="Project 2" 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <p className="text-sm font-medium">Modern Office Tower</p>
                  <p className="text-xs text-muted-foreground">Completed 2022 • 20 Floors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeveloperDetailsModal;
