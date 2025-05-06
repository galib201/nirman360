
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatPrice } from "@/utils/formatters";
import { PropertyService } from "@/services/api";
import { Property } from "@/models";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

const BookVisit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [paymentType, setPaymentType] = useState<string>("standard");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM", 
    "1:00 PM", "2:00 PM", "3:00 PM", 
    "4:00 PM", "5:00 PM"
  ];
  
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await PropertyService.getPropertyById(id);
          setProperty(data);
        }
      } catch (error) {
        console.error('Error fetching property:', error);
        toast.error("Failed to load property details.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperty();
  }, [id]); // Added id as dependency
  
  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time for your visit");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Your visit has been booked successfully!");
      navigate(`/properties/${id}`);
    }, 2000);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-nirman-navy border-t-transparent"></div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Property Not Found</h2>
            <Button asChild>
              <a href="/properties">Browse Properties</a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-background py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-display font-semibold mb-6">
            Book a Visit
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Select Date & Time</CardTitle>
                  <CardDescription>
                    Choose your preferred date and time for visiting the property
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Select Date</h3>
                    
                    <div className="border rounded-md p-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !selectedDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                            disabled={(date) => {
                              // Disable past dates and dates more than 30 days in the future
                              const now = new Date();
                              now.setHours(0, 0, 0, 0);
                              const maxDate = new Date();
                              maxDate.setDate(maxDate.getDate() + 30);
                              return date < now || date > maxDate;
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Select Time</h3>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          onClick={() => setSelectedTime(time)}
                          className="flex items-center justify-center gap-2"
                        >
                          <Clock className="h-4 w-4" />
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Contact Unlock Options</h3>
                    
                    <RadioGroup className="space-y-4" value={paymentType} onValueChange={setPaymentType}>
                      <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="standard" id="standard" />
                        <div className="grid gap-1">
                          <Label htmlFor="standard" className="font-medium">Standard Unlock (BDT 49)</Label>
                          <p className="text-sm text-muted-foreground">
                            Contact details will be shared after successful visit
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="premium" id="premium" />
                        <div className="grid gap-1">
                          <Label htmlFor="premium" className="font-medium">Premium Unlock (BDT 99)</Label>
                          <p className="text-sm text-muted-foreground">
                            Immediate access to contact details + priority booking
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    onClick={handleBooking} 
                    disabled={!selectedDate || !selectedTime || isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? "Processing..." : "Confirm & Pay"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="aspect-video overflow-hidden rounded-md">
                    <img 
                      src={property.images[0]} 
                      alt={property.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="font-semibold text-lg">{property.title}</h3>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{property.location.area}, {property.location.city}</span>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Price</span>
                      <span className="font-medium">
                        {formatPrice(property.price)}
                        {property.category === 'rent' && '/month'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Property Type</span>
                      <span className="font-medium capitalize">{property.type}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <span className="font-medium capitalize">{property.status}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6 p-4 bg-nirman-cream rounded-lg">
                <h3 className="font-medium mb-2">Booking Guidelines</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-nirman-gold">•</span>
                    <span>Arrive on time for your scheduled visit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-nirman-gold">•</span>
                    <span>Bring your ID card for verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-nirman-gold">•</span>
                    <span>You can reschedule up to 24 hours before the visit</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookVisit;
