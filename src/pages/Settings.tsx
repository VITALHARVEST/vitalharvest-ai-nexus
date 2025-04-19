
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Settings = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">सेटिंग्स</h1>

      <Card>
        <CardHeader>
          <CardTitle>नोटिफिकेशन सेटिंग्स</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notif">ईमेल नोटिफिकेशन</Label>
            <Switch id="email-notif" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notif">पुश नोटिफिकेशन</Label>
            <Switch id="push-notif" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>अकाउंट सेटिंग्स</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>प्रोफ़ाइल अपडेट</Label>
            <Button className="mt-2">प्रोफ़ाइल एडिट करें</Button>
          </div>
          <div>
            <Label>पासवर्ड बदलें</Label>
            <Button variant="outline" className="mt-2">पासवर्ड रीसेट करें</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
