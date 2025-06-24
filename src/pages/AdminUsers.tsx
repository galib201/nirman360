import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Eye } from "lucide-react";
import { mockUsers, mockUserActivities, MockUser, MockUserActivity } from "@/utils/mockData";

const AdminUsers = () => {
  const [users] = useState<MockUser[]>(mockUsers);
  const [activities] = useState<MockUserActivity[]>(mockUserActivities);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActionBadge = (action: string) => {
    const styles = {
      visited: "bg-blue-100 text-blue-800",
      unlocked: "bg-green-100 text-green-800",
      booked: "bg-purple-100 text-purple-800"
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[action as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`}>
        {action.charAt(0).toUpperCase() + action.slice(1)}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-nirman-navy">User Management</h2>
        <p className="text-gray-600 mt-2">Monitor user activity and engagement</p>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Users</CardTitle>
          <CardDescription>Find users by name or email</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-gray-500" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
          <CardDescription>User registration and activity overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User Details</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Properties Viewed</TableHead>
                  <TableHead>Bookings Made</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-nirman-navy">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p>{new Date(user.joinDate).toLocaleDateString()}</p>
                    </TableCell>
                    <TableCell>
                      <p>{new Date(user.lastActive).toLocaleDateString()}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{user.propertiesViewed}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-purple-600">{user.bookingsMade}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* User Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Recent User Activities</CardTitle>
          <CardDescription>Latest user interactions with properties</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User Email</TableHead>
                  <TableHead>Property Title</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <p className="font-medium text-nirman-navy">{activity.userEmail}</p>
                    </TableCell>
                    <TableCell>
                      <p>{activity.propertyTitle}</p>
                    </TableCell>
                    <TableCell>
                      {getActionBadge(activity.action)}
                    </TableCell>
                    <TableCell>
                      <p>{new Date(activity.date).toLocaleDateString()}</p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
