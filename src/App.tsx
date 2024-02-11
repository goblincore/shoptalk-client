import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MachineView from "./views/MachineView";
import ProjectInfoView from "./views/ProjectInfoView";
import CalendarView from "./views/CalendarView";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Tabs defaultValue="account" className="w-[full]">
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
