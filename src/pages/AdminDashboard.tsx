
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  DollarSign
} from "lucide-react";

const AdminDashboard = () => {
  // Mock dashboard stats
  const [stats] = useState({
    totalProperties: 156,
    pendingApproval: 12,
    totalUsers: 1247,
    activeUsers: 892,
    totalRevenue: 2500000,
    monthlyGrowth: 15.2
  });

  const recentActivities = [
    {
      id: 1,
      user: "john.doe@example.com",
      action: "Listed new property",
      property: "Luxury Apartment in Gulshan",
      time: "2 hours ago"
    },
    {
      id: 2,
      user: "jane.smith@example.com",
      action: "Booked property visit",
      property: "Modern Villa in Uttara",
      time: "4 hours ago"
    },
    {
      id: 3,
      user: "admin@nirman360.com",
      action: "Approved property",
      property: "Commercial Space in Dhanmondi",
      time: "6 hours ago"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Message */}
      <div>
        <h2 className="text-3xl font-bold text-nirman-navy">Welcome to Admin Dashboard</h2>
        <p className="text-gray-600 mt-2">Monitor and manage your real estate platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-nirman-navy">{stats.totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingApproval} pending approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-nirman-navy">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeUsers} active this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-nirman-navy">
              ৳{stats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-green-600">
              +{stats.monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{stats.pendingApproval}</div>
            <p className="text-xs text-muted-foreground">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Properties</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.totalProperties - stats.pendingApproval}
            </div>
            <p className="text-xs text-muted-foreground">
              Successfully verified
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.monthlyGrowth}%</div>
            <p className="text-xs text-muted-foreground">
              Monthly user growth
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest platform activities and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-nirman-navy">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}: {activity.property}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
