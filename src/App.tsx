import "./App.css";
import ProjectInfoView from "./views/ProjectInfoView";
import CalendarView from "./views/CalendarView";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function App() {
  const payloadUrl = import.meta.env.VITE_PUBLIC_PAYLOAD_URL;

  console.log('///payloadUrl', payloadUrl);

  const fetchResourceInfo = async () => {
    const res = await fetch(`${payloadUrl}/get-resource`);
    console.log("///get resource res");
  };

  useEffect(() => {
    fetchResourceInfo();
  }, []);

  return (
    <>
      <Tabs defaultValue="time" className="w-[full]">
        <TabsList>
          <TabsTrigger value="time">Step 1: Pick Time</TabsTrigger>
          <TabsTrigger value="project">Step 2: Project Info</TabsTrigger>
          <TabsTrigger value="payment">Step 3: Payment Information</TabsTrigger>
        </TabsList>
        <TabsContent value="time">
          <CalendarView />
        </TabsContent>
        <TabsContent value="project">
          <ProjectInfoView />
        </TabsContent>
        <TabsContent value="payment">
          <ProjectInfoView />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default App;
