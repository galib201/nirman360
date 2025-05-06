
import { useEffect, useState } from "react";
import { BookingRequest, Property } from "@/models";
import { BookingService, PropertyService, UserService } from "@/services/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/utils/formatters";
import PropertyCard from "@/components/PropertyCard";

// Mock user ID for demonstration
const MOCK_USER_ID = "u1";

const Dashboard = () => {
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [bookingProperties, setBookingProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch user data
        const userData = await UserService.getUserData(MOCK_USER_ID);
        
        if (userData) {
          // Fetch saved properties
          const savedPropertiesPromises = userData.savedProperties.map(
            propertyId => PropertyService.getPropertyById(propertyId)
          );
          
          const savedPropertiesData = await Promise.all(savedPropertiesPromises);
          setSavedProperties(savedPropertiesData.filter(Boolean) as Property[]);
          
          // Fetch bookings
          const bookingsData = await BookingService.getUserBookings(MOCK_USER_ID);
          setBookings(bookingsData);
          
          // Fetch properties for bookings
          const bookingPropertiesPromises = bookingsData.map(
            booking => PropertyService.getPropertyById(booking.propertyId)
          );
          
          const bookingPropertiesData = await Promise.all(bookingPropertiesPromises);
          setBookingProperties(bookingPropertiesData.filter(Boolean) as Property[]);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="bg-gradient-premium text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-display font-semibold">My Nirman Dashboard</h1>
          <p className="mt-2 text-gray-200">
            Manage your saved properties, bookings and account settings
          </p>
        </div>
      </div>
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="saved">
            <TabsList className="mb-8">
              <TabsTrigger value="saved">Saved Properties</TabsTrigger>
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
              <TabsTrigger value="completed">Completed Deals</TabsTrigger>
            </TabsList>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-nirman-navy border-t-transparent"></div>
              </div>
            ) : (
              <>
                {/* Saved Properties Tab */}
                <TabsContent value="saved">
                  <h2 className="text-xl font-semibold mb-6">Your Saved Properties</h2>
                  
                  {savedProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {savedProperties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                      ))}
                    </div>
                  ) : (
                    <Card className="p-6 text-center">
                      <h3 className="text-lg font-medium mb-2">No saved properties yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start saving properties you're interested in for easy reference
                      </p>
                      <a 
                        href="/properties" 
                        className="text-nirman-navy hover:text-nirman-gold underline transition"
                      >
                        Browse Properties
                      </a>
                    </Card>
                  )}
                </TabsContent>
                
                {/* Bookings Tab */}
                <TabsContent value="bookings">
                  <h2 className="text-xl font-semibold mb-6">Your Bookings</h2>
                  
                  {bookings.length > 0 ? (
                    <div className="space-y-6">
                      {bookings.map((booking, index) => {
                        const relatedProperty = bookingProperties.find(p => p.id === booking.propertyId);
                        
                        return (
                          <Card key={booking.id} className="overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                              {relatedProperty && (
                                <div className="w-full md:w-52 h-48">
                                  <img 
                                    src={relatedProperty.images[0]} 
                                    alt={relatedProperty.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              
                              <div className="p-6 flex-grow">
                                {relatedProperty ? (
                                  <>
                                    <h3 className="text-lg font-medium mb-1">
                                      <a 
                                        href={`/properties/${relatedProperty.id}`}
                                        className="hover:text-nirman-gold transition"
                                      >
                                        {relatedProperty.title}
                                      </a>
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-4">
                                      {relatedProperty.location.address}, {relatedProperty.location.area}
                                    </p>
                                  </>
                                ) : (
                                  <p>Property details not available</p>
                                )}
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <span className="text-sm text-muted-foreground block">Visit Date</span>
                                    <span className="font-medium">{formatDate(booking.date)}</span>
                                  </div>
                                  
                                  <div>
                                    <span className="text-sm text-muted-foreground block">Time Slot</span>
                                    <span className="font-medium">{booking.timeSlot}</span>
                                  </div>
                                  
                                  <div>
                                    <span className="text-sm text-muted-foreground block">Status</span>
                                    <span className={`font-medium capitalize ${
                                      booking.status === 'confirmed' ? 'text-green-600' : 
                                      booking.status === 'cancelled' ? 'text-red-600' : 
                                      'text-amber-600'
                                    }`}>
                                      {booking.status}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <Card className="p-6 text-center">
                      <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Book property visits to see them listed here
                      </p>
                      <a 
                        href="/properties" 
                        className="text-nirman-navy hover:text-nirman-gold underline transition"
                      >
                        Browse Properties
                      </a>
                    </Card>
                  )}
                </TabsContent>
                
                {/* Completed Deals Tab */}
                <TabsContent value="completed">
                  <h2 className="text-xl font-semibold mb-6">Completed Deals</h2>
                  
                  <Card className="p-6 text-center">
                    <h3 className="text-lg font-medium mb-2">No completed deals yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Completed transactions will appear here
                    </p>
                    
                    <div className="max-w-lg mx-auto bg-nirman-lightblue p-4 rounded-md mt-6">
                      <h4 className="font-semibold mb-2">Deal Completion Process</h4>
                      <ol className="text-left text-sm space-y-2">
                        <li className="flex items-start">
                          <span className="bg-nirman-navy text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                          <span>Complete your transaction with the property owner</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-nirman-navy text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                          <span>Mark the deal as completed in your dashboard</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-nirman-navy text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                          <span>Property owner pays 1% service fee and confirms the deal</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-nirman-navy text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                          <span>Both parties receive confirmation and transaction history</span>
                        </li>
                      </ol>
                    </div>
                  </Card>
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
