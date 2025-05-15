
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
import { MessageSquare, Send, Users, PlusCircle, Bell } from "lucide-react";

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
                Community Chat
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Connect with property buyers, sellers, developers and real estate experts in our community forum
              </p>
            </div>
          </div>

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

            {/* Main Chat */}
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CommunityChat;
