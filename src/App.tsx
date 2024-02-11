import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MachineView from "./views/MachineView";
import CalendarView from "./views/CalendarView";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MachineView />
      <CalendarView />
    </>
  );
}

export default App;
