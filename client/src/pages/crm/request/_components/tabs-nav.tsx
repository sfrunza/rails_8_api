import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import CustomerTab from "./customer-tab/customer-tab";
import DetailsTab from "./details-tab/details-tab";
import { useAppSelector } from "@/store";
import MessagesTab from "./messages-tab/messages-tab";
import RequestTab from "./request-tab/request-tab";

export default function TabsNav() {
  const request = useAppSelector((state) => state.request.request);
  const [activeTab, setActiveTab] = useState<string>("request");

  const hasDetails = request?.details?.is_touched ?? false;

  return (
    <Tabs
      value={activeTab}
      onValueChange={(val) => {
        setActiveTab(val);
      }}
    >
      <ScrollArea className="border-b px-4 pb-4 md:px-7">
        <TabsList className="justify-start gap-1">
          <TabsTrigger value="request">Request #{request?.id}</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="details">
            <div className="relative">
              Details{" "}
              {hasDetails && (
                <span className="absolute -right-1.5 top-0 size-1.5 rounded-full bg-green-600" />
              )}
            </div>
          </TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Request */}
      <TabsContent value="request">
        <RequestTab />
      </TabsContent>

      {/* Customer */}
      <TabsContent value="customer">
        <CustomerTab />
      </TabsContent>

      {/* messages */}
      <TabsContent value="messages" className="mt-0">
        <MessagesTab />
      </TabsContent>

      {/* logs */}
      <TabsContent value="logs">logs</TabsContent>

      {/* details */}
      <TabsContent value="details">
        <DetailsTab />
      </TabsContent>

      {/* photos */}
      <TabsContent value="photos">photos</TabsContent>

      {/* inventory */}
      <TabsContent value="inventory">inventory</TabsContent>
    </Tabs>
  );
}
