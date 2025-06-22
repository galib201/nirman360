
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Calendar, Send, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  date: string;
  active: boolean;
}

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'System Maintenance',
      message: 'The platform will undergo scheduled maintenance on Sunday from 2:00 AM to 4:00 AM.',
      type: 'warning',
      date: '2024-01-20',
      active: true
    },
    {
      id: '2',
      title: 'New Features Available',
      message: 'We have added new AI-powered property recommendations. Check them out in your dashboard!',
      type: 'success',
      date: '2024-01-18',
      active: true
    }
  ]);
  
  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newType, setNewType] = useState<'info' | 'warning' | 'success'>('info');

  const handlePostAnnouncement = () => {
    if (!newTitle.trim() || !newMessage.trim()) {
      toast.error("Please fill in both title and message");
      return;
    }

    const announcement: Announcement = {
      id: Date.now().toString(),
      title: newTitle,
      message: newMessage,
      type: newType,
      date: new Date().toISOString().split('T')[0],
      active: true
    };

    setAnnouncements(prev => [announcement, ...prev]);
    
    // Save to localStorage for displaying to users
    const existingAnnouncements = localStorage.getItem("announcements");
    const announcementsList = existingAnnouncements ? JSON.parse(existingAnnouncements) : [];
    announcementsList.push(announcement);
    localStorage.setItem("announcements", JSON.stringify(announcementsList));

    // Clear form
    setNewTitle("");
    setNewMessage("");
    setNewType('info');
    
    toast.success("Announcement posted successfully!");
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(ann => ann.id !== id));
    
    // Update localStorage
    const existingAnnouncements = localStorage.getItem("announcements");
    if (existingAnnouncements) {
      const announcementsList = JSON.parse(existingAnnouncements);
      const updatedList = announcementsList.filter((ann: Announcement) => ann.id !== id);
      localStorage.setItem("announcements", JSON.stringify(updatedList));
    }
    
    toast.success("Announcement deleted successfully!");
  };

  const getTypeBadge = (type: string) => {
    const styles = {
      info: "bg-blue-100 text-blue-800",
      warning: "bg-yellow-100 text-yellow-800",
      success: "bg-green-100 text-green-800"
    };
    return (
      <Badge className={styles[type as keyof typeof styles]}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-nirman-navy">Announcements</h2>
        <p className="text-gray-600 mt-2">Broadcast important messages to all platform users</p>
      </div>

      {/* Post New Announcement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Megaphone className="h-5 w-5" />
            <span>Post New Announcement</span>
          </CardTitle>
          <CardDescription>
            Create announcements that will be displayed to users on their dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              placeholder="Announcement title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <Textarea
              placeholder="Write your announcement message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={4}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as 'info' | 'warning' | 'success')}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="success">Success</option>
            </select>
          </div>
          
          <Button
            onClick={handlePostAnnouncement}
            className="bg-nirman-gold hover:bg-nirman-gold/90 text-nirman-navy"
          >
            <Send className="h-4 w-4 mr-2" />
            Post Announcement
          </Button>
        </CardContent>
      </Card>

      {/* Active Announcements */}
      <Card>
        <CardHeader>
          <CardTitle>Active Announcements ({announcements.length})</CardTitle>
          <CardDescription>
            All announcements currently visible to users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Megaphone className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No announcements yet. Create your first announcement above!</p>
              </div>
            ) : (
              announcements.map((announcement) => (
                <div key={announcement.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium text-nirman-navy">{announcement.title}</h3>
                        {getTypeBadge(announcement.type)}
                      </div>
                      <p className="text-gray-600 mb-2">{announcement.message}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>Posted on {new Date(announcement.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteAnnouncement(announcement.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-nirman-navy">{announcements.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {announcements.filter(ann => ann.active).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {announcements.filter(ann => {
                const today = new Date();
                const annDate = new Date(ann.date);
                const diffTime = Math.abs(today.getTime() - annDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 7;
              }).length}
            </div>
            <p className="text-xs text-gray-500">Last 7 days</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnnouncements;
