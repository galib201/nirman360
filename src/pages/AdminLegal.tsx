
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { mockLawFirms, MockLawFirm } from "@/data/mockData";

const AdminLegal = () => {
  const [lawFirms, setLawFirms] = useState<MockLawFirm[]>(mockLawFirms);

  // Toggle law firm status
  const toggleFirmStatus = (firmId: string) => {
    setLawFirms(prev =>
      prev.map(firm =>
        firm.id === firmId
          ? { ...firm, status: firm.status === 'active' ? 'inactive' : 'active' }
          : firm
      )
    );
    toast.success("Law firm status updated successfully!");
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Inactive</Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-nirman-navy">Legal Partners</h2>
          <p className="text-gray-600 mt-2">Manage legal assistance partners and law firms</p>
        </div>
        <Button className="bg-nirman-gold hover:bg-nirman-gold/90 text-nirman-navy">
          <Plus className="h-4 w-4 mr-2" />
          Add Law Firm
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-nirman-navy">{lawFirms.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {lawFirms.filter(firm => firm.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inactive Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {lawFirms.filter(firm => firm.status === 'inactive').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Law Firms Table */}
      <Card>
        <CardHeader>
          <CardTitle>Legal Assistance Partners</CardTitle>
          <CardDescription>Manage law firms providing legal support to users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Law Firm</TableHead>
                  <TableHead>Contact Information</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lawFirms.map((firm) => (
                  <TableRow key={firm.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-nirman-navy">{firm.name}</p>
                        <p className="text-sm text-gray-500">ID: {firm.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{firm.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{firm.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-purple-600 border-purple-200">
                        {firm.specialization}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(firm.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={firm.status === 'active'}
                          onCheckedChange={() => toggleFirmStatus(firm.id)}
                        />
                        <span className="text-sm text-gray-500">
                          {firm.status === 'active' ? 'Activate' : 'Deactivate'}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Partnership Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Partnership Benefits</CardTitle>
          <CardDescription>What we offer to our legal partners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-nirman-navy mb-2">Client Referrals</h4>
              <p className="text-sm text-gray-600">Direct access to customers needing legal assistance with property matters.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-nirman-navy mb-2">Platform Integration</h4>
              <p className="text-sm text-gray-600">Seamless integration with our platform for better customer experience.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-nirman-navy mb-2">Marketing Support</h4>
              <p className="text-sm text-gray-600">Featured listing on our platform to increase your firm's visibility.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-nirman-navy mb-2">Quality Assurance</h4>
              <p className="text-sm text-gray-600">Verified badge and quality rating system to build trust with clients.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLegal;
