
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import {
  Chart,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { Bar, Line } from 'recharts';
import { Shield, Building, User, Home, Search, Zap, CheckCircle, AlertCircle, Settings, Bell, Trash, Download } from "lucide-react";

import { PROPERTY_ANALYTICS, MOCK_PROPERTIES, MOCK_BOOKINGS, ADMIN_USER } from "@/utils/mockData";
import { Property } from "@/models";

// Register ChartJS components
Chart.register(
  LineElement,
  BarElement,
  PointElement,
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [statisticsData] = useState(PROPERTY_ANALYTICS);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication check against our mock admin user
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
      setIsAuthenticated(true);
      toast.success("Welcome to Admin Dashboard!");
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  const handleVerifyProperty = (propertyId: string) => {
    // Update the properties list with the verified property
    setProperties(prevProperties => 
      prevProperties.map(property => 
        property.id === propertyId 
          ? { ...property, isVerified: true }
          : property
      )
    );
    
    toast.success("Property has been verified successfully!");
  };

  const handleFeatureProperty = (propertyId: string) => {
    // Update the properties list to toggle premium status
    setProperties(prevProperties => 
      prevProperties.map(property => 
        property.id === propertyId 
          ? { ...property, isPremium: !property.isPremium }
          : property
      )
    );
    
    toast.success("Property premium status updated!");
  };

  const handleDeleteProperty = (propertyId: string) => {
    // Remove the property from the list
    setProperties(prevProperties => 
      prevProperties.filter(property => property.id !== propertyId)
    );
    
    toast.success("Property has been deleted!");
  };

  // Filter properties that need verification
  const unverifiedProperties = properties.filter(property => !property.isVerified);
  
  // Filter properties based on search query
  const filteredUnverifiedProperties = searchQuery 
    ? unverifiedProperties.filter(property => 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.id.toLowerCase().includes(searchQuery.toLowerCase())
      ) 
    : unverifiedProperties;

  const allFilteredProperties = searchQuery 
    ? properties.filter(property => 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.id.toLowerCase().includes(searchQuery.toLowerCase())
      ) 
    : properties;

  // Login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nirman-navy">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <Shield className="mx-auto h-12 w-12 text-nirman-gold" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Admin Login</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your credentials to access the admin dashboard
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-4">
            <Shield className="h-6 w-6 text-nirman-gold" />
            <h1 className="text-xl font-semibold">Nirman360 Admin</h1>
          </div>
          
          <div className="flex-1" />
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600"></span>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-5 w-5" />
            </Button>
            <span className="text-sm text-muted-foreground">Welcome, Admin</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setIsAuthenticated(false);
                setUsername("");
                setPassword("");
                toast.info("Logged out successfully");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Listings
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statisticsData.totalListings}</div>
              <p className="text-xs text-muted-foreground">
                {statisticsData.listingsPerCategory.buy} for sale, {statisticsData.listingsPerCategory.rent} for rent
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Verified Listings
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statisticsData.verifiedListings}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((statisticsData.verifiedListings / statisticsData.totalListings) * 100)}% of total listings
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Verification
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statisticsData.pendingVerification}</div>
              <p className="text-xs text-muted-foreground">
                {unverifiedProperties.length} in current view
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Commission Revenue
              </CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">৳252,500</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="verification">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
            <TabsTrigger value="verification">Verification Queue</TabsTrigger>
            <TabsTrigger value="all-listings">All Listings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="verification" className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Verification Queue</h2>
              <div className="flex gap-2">
                <Input 
                  placeholder="Search properties..." 
                  className="w-64" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline" size="sm" onClick={() => setSearchQuery("")}>Clear</Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Posted Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUnverifiedProperties.map(property => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">{property.id}</TableCell>
                      <TableCell>{property.title}</TableCell>
                      <TableCell>{property.location.area}, {property.location.city}</TableCell>
                      <TableCell>{property.type}</TableCell>
                      <TableCell>{property.category === "buy" ? "For Sale" : "For Rent"}</TableCell>
                      <TableCell>{new Date(property.postedAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" onClick={() => handleVerifyProperty(property.id)}>
                            <CheckCircle className="h-4 w-4 mr-1" /> Verify
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => handleDeleteProperty(property.id)}
                          >
                            <Trash className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredUnverifiedProperties.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        No properties pending verification
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="all-listings" className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">All Listings</h2>
              <div className="flex gap-2">
                <Input 
                  placeholder="Search properties..." 
                  className="w-64" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline" size="sm" onClick={() => setSearchQuery("")}>Clear</Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" /> Export
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Premium</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allFilteredProperties.map(property => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">{property.id}</TableCell>
                      <TableCell>{property.title}</TableCell>
                      <TableCell>{property.location.area}, {property.location.city}</TableCell>
                      <TableCell>{property.type}</TableCell>
                      <TableCell>{property.category === "buy" ? "For Sale" : "For Rent"}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${property.isVerified ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                          {property.isVerified ? "Verified" : "Pending"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${property.isPremium ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"}`}>
                          {property.isPremium ? "Premium" : "Standard"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {!property.isVerified && (
                            <Button size="sm" variant="outline" onClick={() => handleVerifyProperty(property.id)}>
                              <CheckCircle className="h-4 w-4 mr-1" /> Verify
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant={property.isPremium ? "default" : "outline"} 
                            onClick={() => handleFeatureProperty(property.id)}
                          >
                            {property.isPremium ? "Remove Premium" : "Make Premium"}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => handleDeleteProperty(property.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Listings Performance</CardTitle>
                <CardDescription>
                  Breakdown of listing performance by area and category
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                {/* Charts would go here - using basic table for mock */}
                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Listings by Area</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Area</TableHead>
                            <TableHead className="text-right">Count</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {statisticsData.mostViewedAreas.map((area, index) => (
                            <TableRow key={area}>
                              <TableCell>{area}</TableCell>
                              <TableCell className="text-right">{35 - index * 5}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Listings by Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Count</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Object.entries(statisticsData.listingsPerType).map(([type, count]) => (
                            <TableRow key={type}>
                              <TableCell className="capitalize">{type}</TableCell>
                              <TableCell className="text-right">{count}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Traffic Analytics</CardTitle>
                <CardDescription>Visitor data and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">Daily Visitors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">1,248</div>
                      <p className="text-xs text-muted-foreground">+12% from yesterday</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">Avg. Session Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">4:32</div>
                      <p className="text-xs text-muted-foreground">+0:42 from last week</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">Bounce Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">24.8%</div>
                      <p className="text-xs text-muted-foreground">-2.1% from last week</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Overview of recent property transactions and commissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {statisticsData.recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{transaction.propertyId}</TableCell>
                        <TableCell>৳{transaction.amount.toLocaleString()}</TableCell>
                        <TableCell>৳{transaction.commission.toLocaleString()}</TableCell>
                        <TableCell className="capitalize">{transaction.type}</TableCell>
                        <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            Completed
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Summary</CardTitle>
                <CardDescription>Monthly breakdown of revenue and commissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Properties Sold</TableHead>
                      <TableHead>Properties Rented</TableHead>
                      <TableHead>Total Revenue</TableHead>
                      <TableHead>YoY Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>May 2025</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>28</TableCell>
                      <TableCell>৳252,500</TableCell>
                      <TableCell className="text-green-600">+12.5%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>April 2025</TableCell>
                      <TableCell>9</TableCell>
                      <TableCell>31</TableCell>
                      <TableCell>৳224,000</TableCell>
                      <TableCell className="text-green-600">+8.3%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>March 2025</TableCell>
                      <TableCell>11</TableCell>
                      <TableCell>24</TableCell>
                      <TableCell>৳206,800</TableCell>
                      <TableCell className="text-green-600">+5.1%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user accounts and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Registered Users</h3>
                  <div className="flex gap-2">
                    <Input placeholder="Search users..." className="w-64" />
                    <Button variant="outline" size="sm">Filter</Button>
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Saved Properties</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>u1</TableCell>
                      <TableCell>John Doe</TableCell>
                      <TableCell>john.doe@example.com</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          Buyer
                        </span>
                      </TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">Disable</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>u2</TableCell>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>jane.smith@example.com</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                          Agent
                        </span>
                      </TableCell>
                      <TableCell>4</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">Disable</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>u3</TableCell>
                      <TableCell>Robert Johnson</TableCell>
                      <TableCell>robert@example.com</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
                          Owner
                        </span>
                      </TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">Disable</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Showing 3 of 243 users
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
                    <Button variant="outline" size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system parameters and defaults</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Commission Rates</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Sale Commission (%)</label>
                        <Input type="number" placeholder="2.5" defaultValue="2.5" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Rental Commission (%)</label>
                        <Input type="number" placeholder="1.0" defaultValue="1.0" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Premium Listing Fee (৳)</label>
                        <Input type="number" placeholder="5000" defaultValue="5000" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">System Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>New Property Alerts</span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>User Registration Alerts</span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Booking Confirmation Emails</span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
