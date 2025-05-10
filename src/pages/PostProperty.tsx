
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PropertyType, PropertyCategory } from "@/models";
import { toast } from "sonner";
import { Building, MapPin, Home, User } from "lucide-react";

interface PropertyOwnerProps {
  onLogoClick?: () => void;
}

const PostProperty = ({ onLogoClick }: PropertyOwnerProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Your property has been submitted for verification!");
      navigate("/dashboard");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header onLogoClick={onLogoClick} />
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">List Your Property</h1>
          <p className="text-muted-foreground mb-8">
            Fill in the details below to list your property on Nirman360
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Property Management</h3>
              <p className="text-muted-foreground text-sm">
                Easily manage all your property listings in one place. Update details, track interest, and handle inquiries.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Professional Photography</h3>
              <p className="text-muted-foreground text-sm">
                Get professional photos of your property to attract more buyers. Our photography services will make your property stand out.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Pricing & Fees</h3>
              <p className="text-muted-foreground text-sm">
                Transparent pricing with no hidden fees. We charge 1% commission only on successful deals, not on listings.
              </p>
            </div>
          </div>
          
          <div className="bg-background rounded-lg p-8 shadow-lg border">
            <h2 className="text-2xl font-semibold mb-6">Property Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Property Title
                  </label>
                  <Input 
                    id="title"
                    placeholder="Enter a descriptive title"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Listing Type
                  </label>
                  <Select defaultValue="buy">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buy">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="propertyType" className="text-sm font-medium">
                    Property Type
                  </label>
                  <Select defaultValue="apartment">
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="bedrooms" className="text-sm font-medium">
                    Bedrooms
                  </label>
                  <Select defaultValue="2">
                    <SelectTrigger>
                      <SelectValue placeholder="Select bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5+">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="bathrooms" className="text-sm font-medium">
                    Bathrooms
                  </label>
                  <Select defaultValue="2">
                    <SelectTrigger>
                      <SelectValue placeholder="Select bathrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5+">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium">
                    Price (৳)
                  </label>
                  <Input 
                    id="price"
                    type="number"
                    placeholder="Enter price in BDT"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="area" className="text-sm font-medium">
                    Area (sq ft)
                  </label>
                  <Input 
                    id="area"
                    type="number"
                    placeholder="Enter area in square feet"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Address
                </label>
                <Input 
                  id="address"
                  placeholder="Enter property address"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="area" className="text-sm font-medium">
                    Area/Neighborhood
                  </label>
                  <Input 
                    id="area"
                    placeholder="e.g. Gulshan"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-medium">
                    City
                  </label>
                  <Input 
                    id="city"
                    placeholder="e.g. Dhaka"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="postal" className="text-sm font-medium">
                    Postal Code
                  </label>
                  <Input 
                    id="postal"
                    placeholder="e.g. 1212"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea 
                  id="description"
                  placeholder="Describe your property in detail"
                  className="min-h-[120px]"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Property Photos
                </label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <p className="text-muted-foreground mb-2">
                    Drag and drop photos or click to browse
                  </p>
                  <Button type="button" variant="outline" className="mt-2">
                    Upload Photos
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Property"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostProperty;
