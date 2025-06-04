import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Send, Users, PlusCircle, Bell, Heart, Share2, Home, TrendingUp, Star } from "lucide-react";

const CommunityChat = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-semibold mb-2 flex items-center">
                <MessageSquare className="mr-3 h-8 w-8 text-nirman-gold" />
                Community
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Connect with property buyers, sellers, developers and real estate experts in Bangladesh
              </p>
            </div>
          </div>

          <Tabs defaultValue="feed" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="chat">Live Chat</TabsTrigger>
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Trending Topics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">#DhakaPropritery</span>
                        <Badge variant="outline">142 posts</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">#FirstTimeBuyer</span>
                        <Badge variant="outline">89 posts</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">#PropertyInvestment</span>
                        <Badge variant="outline">76 posts</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">#RentVsBuy</span>
                        <Badge variant="outline">54 posts</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Top Contributors</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
                            <AvatarFallback>SJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">Sarah Johnson</p>
                            <p className="text-xs text-muted-foreground">Real Estate Agent</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm">4.9</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
                            <AvatarFallback>RK</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">Rahul Khan</p>
                            <p className="text-xs text-muted-foreground">Property Developer</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm">4.8</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Feed */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Create Post */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
                          <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Input placeholder="Share your property experience, ask questions, or post updates..." className="mb-3" />
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Home className="h-4 w-4 mr-1" /> Property
                              </Button>
                              <Button variant="outline" size="sm">
                                <TrendingUp className="h-4 w-4 mr-1" /> Market Update
                              </Button>
                            </div>
                            <Button size="sm">
                              <Send className="h-4 w-4 mr-1" /> Post
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Property Showcase Post */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
                          <AvatarFallback>RK</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <span className="font-medium">Rahul Khan</span>
                              <Badge className="ml-2 bg-nirman-gold">Property Developer</Badge>
                              <span className="text-xs text-muted-foreground ml-2">2 hours ago</span>
                            </div>
                          </div>
                          <p className="mb-4">
                            🏢 Excited to share our latest project in Dhanmondi! This 12-story modern apartment building 
                            features premium amenities and strategic location. Starting from ৳85 lakh for 1200 sq ft units.
                          </p>
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            <img 
                              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                              alt="Property showcase" 
                              className="rounded-lg aspect-video object-cover"
                            />
                            <img 
                              src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                              alt="Property interior" 
                              className="rounded-lg aspect-video object-cover"
                            />
                          </div>
                          <div className="flex items-center justify-between border-t pt-3">
                            <div className="flex gap-4">
                              <Button variant="ghost" size="sm">
                                <Heart className="h-4 w-4 mr-1" /> 24 Likes
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MessageSquare className="h-4 w-4 mr-1" /> 8 Comments
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share2 className="h-4 w-4 mr-1" /> Share
                              </Button>
                            </div>
                            <Button variant="outline" size="sm">
                              View Property
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Market Analysis Post */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <span className="font-medium">Sarah Johnson</span>
                              <Badge className="ml-2 bg-blue-600">Real Estate Agent</Badge>
                              <span className="text-xs text-muted-foreground ml-2">4 hours ago</span>
                            </div>
                          </div>
                          <p className="mb-4">
                            📊 Market Update: Property prices in Gulshan area have increased by 8% in the last quarter. 
                            This is mainly due to new infrastructure developments and metro rail connectivity. 
                            Great time for investors to consider Gulshan properties! #MarketAnalysis #PropertyInvestment
                          </p>
                          <div className="bg-gradient-to-r from-nirman-lightblue to-nirman-cream p-4 rounded-lg mb-4">
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                <div className="text-lg font-semibold text-nirman-navy">+8%</div>
                                <div className="text-xs text-muted-foreground">Price Growth</div>
                              </div>
                              <div>
                                <div className="text-lg font-semibold text-nirman-navy">₹125L</div>
                                <div className="text-xs text-muted-foreground">Avg. Price</div>
                              </div>
                              <div>
                                <div className="text-lg font-semibold text-nirman-navy">45 days</div>
                                <div className="text-xs text-muted-foreground">Avg. Sale Time</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between border-t pt-3">
                            <div className="flex gap-4">
                              <Button variant="ghost" size="sm">
                                <Heart className="h-4 w-4 mr-1" /> 42 Likes
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MessageSquare className="h-4 w-4 mr-1" /> 15 Comments
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share2 className="h-4 w-4 mr-1" /> Share
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Discussion Post */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
                          <AvatarFallback>AN</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <span className="font-medium">Ayesha Nahar</span>
                              <Badge className="ml-2" variant="secondary">First-time Buyer</Badge>
                              <span className="text-xs text-muted-foreground ml-2">6 hours ago</span>
                            </div>
                          </div>
                          <p className="mb-4">
                            🤔 Need advice: I'm torn between buying in Uttara vs Dhanmondi. Both are within my budget (₹75L), 
                            but I'm confused about future appreciation potential. Uttara seems to have better infrastructure 
                            coming up, but Dhanmondi is more established. What do you think? #FirstTimeBuyer #PropertyAdvice
                          </p>
                          <div className="flex items-center justify-between border-t pt-3">
                            <div className="flex gap-4">
                              <Button variant="ghost" size="sm">
                                <Heart className="h-4 w-4 mr-1" /> 18 Likes
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MessageSquare className="h-4 w-4 mr-1" /> 23 Comments
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share2 className="h-4 w-4 mr-1" /> Share
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="chat" className="space-y-6">
              {/* Keep existing chat content */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Channels</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start font-normal">
                        <MessageSquare className="mr-2 h-4 w-4" /> General
                        <Badge variant="outline" className="ml-auto">24</Badge>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start font-normal bg-muted">
                        <MessageSquare className="mr-2 h-4 w-4" /> Buying Advice
                        <Badge variant="outline" className="ml-auto">8</Badge>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start font-normal">
                        <MessageSquare className="mr-2 h-4 w-4" /> Renting Tips
                        <Badge variant="outline" className="ml-auto">12</Badge>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start font-normal">
                        <MessageSquare className="mr-2 h-4 w-4" /> Property Laws
                        <Badge variant="outline" className="ml-auto">5</Badge>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start font-normal">
                        <MessageSquare className="mr-2 h-4 w-4" /> Market Updates
                        <Badge variant="outline" className="ml-auto">3</Badge>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Active Members</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Sarah Johnson</p>
                          <p className="text-xs text-muted-foreground">Real Estate Agent</p>
                        </div>
                        <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
                          <AvatarFallback>RK</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Rahul Khan</p>
                          <p className="text-xs text-muted-foreground">Property Developer</p>
                        </div>
                        <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
                          <AvatarFallback>AN</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Ayesha Nahar</p>
                          <p className="text-xs text-muted-foreground">First-time Buyer</p>
                        </div>
                        <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>

                      <Button variant="outline" size="sm" className="w-full mt-2">
                        <Users className="mr-2 h-4 w-4" /> View All Members
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Keep existing chat interface */}
                <div className="lg:col-span-3">
                  <Card className="mb-4">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Buying Advice</CardTitle>
                          <CardDescription>Help and tips for property buyers</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          <Bell className="mr-2 h-4 w-4" /> Follow
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                  
                  <div className="bg-card border rounded-lg p-4 mb-4 space-y-6">
                    {/* Message 1 */}
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
                        <AvatarFallback>KA</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">Karim Ahmed</span>
                            <span className="text-xs text-muted-foreground ml-2">3 hours ago</span>
                          </div>
                          <Badge variant="outline">New Member</Badge>
                        </div>
                        <p>
                          Hi everyone! I'm looking to buy my first apartment in Dhanmondi area. My budget is around 80 lacs.
                          Is this reasonable for a 1200 sq ft 3-bedroom apartment? Also, what are the key things I should check
                          when visiting properties?
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Reply</Button>
                          <Button variant="ghost" size="sm">Like</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Reply 1 */}
                    <div className="flex gap-4 pl-10">
                      <Avatar>
                        <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
                        <AvatarFallback>RK</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">Rahul Khan</span>
                            <span className="text-xs text-muted-foreground ml-2">2 hours ago</span>
                          </div>
                          <Badge className="bg-nirman-gold">Property Developer</Badge>
                        </div>
                        <p>
                          Hi Karim, for Dhanmondi your budget is a bit tight for a 1200 sq ft apartment. You might find 
                          something around 900-1000 sq ft in that budget. For key checks, make sure to verify all documents,
                          check for water seepage issues, and inspect electrical fittings carefully. I'd be happy to provide
                          more guidance if needed.
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Reply</Button>
                          <Button variant="ghost" size="sm">Like</Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Reply 2 */}
                    <div className="flex gap-4 pl-10">
                      <Avatar>
                        <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">Sarah Johnson</span>
                            <span className="text-xs text-muted-foreground ml-2">30 minutes ago</span>
                          </div>
                          <Badge className="bg-blue-600">Real Estate Agent</Badge>
                        </div>
                        <p>
                          Adding to what Rahul said, you should also check the building approvals from RAJUK, 
                          verify land ownership documents, and assess the condition of common areas. I have a client
                          who recently purchased in Dhanmondi - paid around 1.1 crore for a 1100 sq ft apartment.
                          Feel free to DM me if you want to discuss options!
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Reply</Button>
                          <Button variant="ghost" size="sm">Like</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Message 2 */}
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
                        <AvatarFallback>AN</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">Ayesha Nahar</span>
                            <span className="text-xs text-muted-foreground ml-2">1 hour ago</span>
                          </div>
                          <Badge variant="secondary">First-time Buyer</Badge>
                        </div>
                        <p>
                          I recently completed my first property purchase and thought I'd share some lessons learned.
                          First, don't rush your decision - I visited over 20 properties before finalizing. Second,
                          negotiate everything - I managed to get the price down by 5% and got the seller to fix several
                          issues before handover. Third, put everything in writing!
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Reply</Button>
                          <Button variant="ghost" size="sm">Like</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Input Area */}
                  <div className="flex gap-2 items-end">
                    <div className="flex-1 space-y-2">
                      <div className="bg-card border rounded-lg p-2">
                        <Input placeholder="Type your message..." className="border-0 focus-visible:ring-0" />
                        <Separator className="my-2" />
                        <div className="flex items-center justify-between">
                          <Button variant="ghost" size="sm">
                            <PlusCircle className="h-4 w-4 mr-1" /> Attach
                          </Button>
                          <Button size="sm">
                            <Send className="h-4 w-4 mr-1" /> Send
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Community guidelines: Be respectful, no self-promotion, stay on topic.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="marketplace" className="space-y-6">
              <Card>
                <CardContent className="py-12 text-center">
                  <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Property Marketplace</h3>
                  <p className="text-muted-foreground mb-4">
                    Buy, sell, and rent properties directly through our community marketplace
                  </p>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> List Your Property
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="groups" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">First-Time Buyers</CardTitle>
                    <CardDescription>Support and advice for new property buyers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <Badge>2,847 members</Badge>
                      <Badge variant="outline">Very Active</Badge>
                    </div>
                    <Button className="w-full">Join Group</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Property Investors</CardTitle>
                    <CardDescription>Advanced strategies for real estate investment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <Badge>1,523 members</Badge>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <Button className="w-full">Join Group</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Dhaka Property Market</CardTitle>
                    <CardDescription>Local insights and market updates for Dhaka</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <Badge>4,291 members</Badge>
                      <Badge variant="outline">Very Active</Badge>
                    </div>
                    <Button className="w-full">Join Group</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CommunityChat;
