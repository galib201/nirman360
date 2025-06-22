
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Building, User, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginForm) => {
    setIsLoading(true);
    
    // Simple validation - just check if password is not empty
    if (!data.password) {
      toast.error("Password is required");
      setIsLoading(false);
      return;
    }

    // Determine user role based on email
    const isAdmin = data.email === "admin@nirman360.com";
    const userRole = isAdmin ? "admin" : "user";
    
    // Store user data in localStorage
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("isLoggedIn", "true");
    
    // Show success message
    toast.success(`Welcome ${isAdmin ? "Admin" : "User"}!`);
    
    // Redirect based on role
    setTimeout(() => {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-nirman-cream p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-nirman-gold text-white font-bold rounded p-3">
              <Building className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-nirman-navy">
            Welcome to Nirman360
          </CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Enter your email"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 1,
                    message: "Password must be at least 1 character"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-nirman-gold hover:bg-nirman-gold/90 text-nirman-navy"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Demo credentials:</p>
            <p><strong>Admin:</strong> admin@nirman360.com</p>
            <p><strong>User:</strong> any other email</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
