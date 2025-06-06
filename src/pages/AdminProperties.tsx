
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, XCircle, Edit } from "lucide-react";
import { toast } from "sonner";
import { mockProperties, MockProperty } from "@/data/mockData";

const AdminProperties = () => {
  const [properties, setProperties] = useState<MockProperty[]>(mockProperties);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTrustScore, setEditingTrustScore] = useState<string | null>(null);

  // Filter properties based on search term
  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update property verification status
  const updateVerificationStatus = (propertyId: string, status: 'approved' | 'rejected') => {
    setProperties(prev =>
      prev.map(property =>
        property.id === propertyId
          ? { ...property, verificationStatus: status }
          : property
      )
    );
    toast.success(`Property ${status} successfully!`);
  };

  // Update trust score
  const updateTrustScore = (propertyId: string, newScore: number) => {
    setProperties(prev =>
      prev.map(property =>
        property.id === propertyId
          ? { ...property, trustScore: newScore }
          : property
      )
    );
    setEditingTrustScore(null);
    toast.success("Trust score updated successfully!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-nirman-navy">Property Management</h2>
        <p className="text-gray-600 mt-2">Review and manage all property listings</p>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Properties</CardTitle>
          <CardDescription>Find properties by title, owner, or location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-gray-500" />
            <Input
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Properties Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Properties ({filteredProperties.length})</CardTitle>
          <CardDescription>Manage property approvals and trust scores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Trust Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-nirman-navy">{property.title}</p>
                        <p className="text-sm text-gray-500">{property.location}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{property.ownerName}</p>
                        <p className="text-sm text-gray-500">{property.ownerEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">৳{property.price.toLocaleString()}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {editingTrustScore === property.id ? (
                          <div className="w-32">
                            <Slider
                              value={[property.trustScore]}
                              onValueChange={(value) => updateTrustScore(property.id, value[0])}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                            <p className="text-xs text-center mt-1">{property.trustScore}%</p>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{property.trustScore}%</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingTrustScore(property.id)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(property.verificationStatus)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {property.verificationStatus === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => updateVerificationStatus(property.id, 'approved')}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => updateVerificationStatus(property.id, 'rejected')}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        {property.verificationStatus === 'approved' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateVerificationStatus(property.id, 'rejected')}
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Revoke
                          </Button>
                        )}
                        {property.verificationStatus === 'rejected' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateVerificationStatus(property.id, 'approved')}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                        )}
                      </div>
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

export default AdminProperties;
