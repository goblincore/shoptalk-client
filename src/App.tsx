import "./App.css";
import ProjectInfoView from "./views/ProjectInfoView";
import CalendarView from "./views/CalendarView";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
type ResourceInfo = {
  department: string;
  resourceName: string;
  description?: string;
};

function App() {
  const payloadUrl = import.meta.env.VITE_PUBLIC_PAYLOAD_URL;
  const [resource, setResource] = useState<ResourceInfo | undefined>();

  console.log("///payloadUrl", payloadUrl);

  const fetchResourceInfo = async () => {
    const res = await fetch(
      `${payloadUrl}/get-resource?resource=65c804a818f492d6d0297b79`
    );
    try {
      const resJson = await res.json();
      console.log("///get resource res json", resJson);
      setResource({
        resourceName: resJson.name,
        department: resJson.department.name,
        description: resJson.description,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchResourceInfo();
  }, []);

  return (
    <>
      <section className="flex flex-col items-start justify-center">
        <h3>{resource?.resourceName}</h3>
        <p>{resource?.department}</p>
        <p>{resource?.description}</p>
      </section>
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
