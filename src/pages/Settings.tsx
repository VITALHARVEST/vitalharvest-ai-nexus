
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "Administrator"
  });

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully."
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notif">Email Notifications</Label>
            <Switch id="email-notif" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notif">Push Notifications</Label>
            <Switch id="push-notif" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={profileData.name} 
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={profileData.email} 
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input 
                  id="role" 
                  name="role" 
                  value={profileData.role} 
                  onChange={handleInputChange}
                />
              </div>
              <Button onClick={handleSaveProfile}>Save Profile</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)} className="ml-2">
                Cancel
              </Button>
            </div>
          ) : (
            <div>
              <div className="grid gap-2 mb-4">
                <div>
                  <span className="font-medium">Name: </span>
                  <span>{profileData.name}</span>
                </div>
                <div>
                  <span className="font-medium">Email: </span>
                  <span>{profileData.email}</span>
                </div>
                <div>
                  <span className="font-medium">Role: </span>
                  <span>{profileData.role}</span>
                </div>
              </div>
              <Button onClick={handleEditProfile}>Edit Profile</Button>
            </div>
          )}
          <div className="mt-4">
            <Label>Password Management</Label>
            <Button variant="outline" className="mt-2">Reset Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
