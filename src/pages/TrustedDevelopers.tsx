
import { useEffect, useState } from "react";
import { DeveloperService } from "@/services/api";
import { TrustedDeveloper } from "@/models";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Star, 
  Award, 
  Phone, 
  Mail, 
  Globe,
  Construction,
  CheckCircle,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";

const TrustedDevelopers = () => {
  const [developers, setDevelopers] = useState<TrustedDeveloper[]>([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState<TrustedDeveloper[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        setLoading(true);
        const data = await DeveloperService.getAllDevelopers();
        setDevelopers(data);
        setFilteredDevelopers(data);
      } catch (error) {
        console.error("Error fetching developers:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDevelopers();
  }, []);
  
  useEffect(() => {
    let result = [...developers];
    
    if (searchTerm) {
      result = result.filter(
        developer => 
          developer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          developer.specializations.some(spec => 
            spec.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          developer.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedLocation) {
      result = result.filter(
        developer => developer.location === selectedLocation
      );
    }
    
    setFilteredDevelopers(result);
  }, [searchTerm, selectedLocation, developers]);
  
  const locations = [...new Set(developers.map(dev => dev.location))];
  
  const handleCall = (developer: TrustedDeveloper) => {
    toast.success(`Calling ${developer.name}...`);
    // In a real app, this would initiate a call or show contact info
    setTimeout(() => {
      toast.info(`Contact: +880-1XXX-XXXXXX (Demo number for ${developer.name})`);
    }, 1000);
  };
  
  const handleEmail = (developer: TrustedDeveloper) => {
    const email = `contact@${developer.name.toLowerCase().replace(/\s+/g, '')}.com`;
    toast.success(`Opening email to ${developer.name}...`);
    window.open(`mailto:${email}?subject=Property Development Inquiry`, '_blank');
  };
  
  const handleViewPortfolio = (developer: TrustedDeveloper) => {
    toast.success(`Opening ${developer.name}'s portfolio...`);
    // In a real app, this would navigate to the developer's portfolio page
    setTimeout(() => {
      toast.info(`Portfolio: www.${developer.name.toLowerCase().replace(/\s+/g, '')}.com/portfolio (Demo URL)`);
    }, 500);
  };
  
  return (
    <PageLayout 
      title="Trusted Developers" 
      subtitle="Work with Bangladesh's best property developers, vetted by Nirman360 for quality, reliability, and customer satisfaction"
    >
      <div className="flex justify-between items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Shield className="text-nirman-gold h-10 w-10" />
          <div>
            <span className="block text-sm font-semibold">Nirman360 Certified</span>
            <span className="text-xs text-muted-foreground">All developers are verified</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 md:col-span-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by developer name, specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 w-full"
            />
          </div>
        </div>
        
        <div>
          <select 
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            value={selectedLocation || ""}
            onChange={(e) => setSelectedLocation(e.target.value || null)}
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-nirman-navy border-t-transparent"></div>
        </div>
      ) : (
        <>
          {filteredDevelopers.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No developers found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search criteria</p>
              <Button onClick={() => { setSearchTerm(""); setSelectedLocation(null); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDevelopers.map((developer) => (
                <Card key={developer.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={developer.image} 
                      alt={developer.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{developer.name}</span>
                      <div className="flex items-center text-amber-500">
                        <Star className="fill-amber-500 h-5 w-5 mr-1" />
                        <span>{developer.rating.toFixed(1)}</span>
                      </div>
                    </CardTitle>
                    <CardDescription className="flex items-center">
                      <span>{developer.location}</span>
                      <span className="mx-2">•</span>
                      <span>Est. {developer.establishedYear}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{developer.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {developer.specializations.slice(0, 3).map((spec, index) => (
                        <Badge key={index} variant="outline" className="bg-muted/50">
                          {spec}
                        </Badge>
                      ))}
                      {developer.specializations.length > 3 && (
                        <Badge variant="outline" className="bg-muted/50">
                          +{developer.specializations.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Award className="h-4 w-4 mr-2" />
                      <span>{developer.completedProjects} Completed Projects</span>
                    </div>
                    
                    {developer.certifications.length > 0 && (
                      <div className="flex items-start text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                        <span>
                          Certified: {developer.certifications.slice(0, 2).join(", ")}
                          {developer.certifications.length > 2 && " & more"}
                        </span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <div className="flex justify-between w-full">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 mr-2"
                        onClick={() => handleCall(developer)}
                      >
                        <Phone className="h-4 w-4 mr-2" /> Call
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleEmail(developer)}
                      >
                        <Mail className="h-4 w-4 mr-2" /> Email
                      </Button>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleViewPortfolio(developer)}
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      View Portfolio
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
      
      <div className="mt-12 bg-muted rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold mb-2">Ready to Build Your Dream Property?</h2>
            <p className="text-muted-foreground mb-4">
              Our AI-powered property building tool can help you plan your construction project 
              and connect with the perfect developer for your needs.
            </p>
            <Button onClick={() => window.location.href = "/nirman-ai?tab=property-nirman"} className="bg-nirman-gold hover:bg-nirman-gold/90">
              <Construction className="mr-2 h-4 w-4" /> Start Building Now
            </Button>
          </div>
          <div className="hidden md:flex items-center justify-center bg-background p-4 rounded-full">
            <Construction className="h-12 w-12 text-nirman-gold" />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TrustedDevelopers;
