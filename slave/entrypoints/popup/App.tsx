import { useState, useEffect } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [lastCommand, setLastCommand] = useState<string | null>(null);

  useEffect(() => {
    // Listen for command updates
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "COMMAND_RECEIVED") {
        setLastCommand(message.payload.command);
      }
    });
    browser.runtime.onMessage.addListener((message) => {
      if (message.type === "COMMAND_RECEIVED") {
        setLastCommand(message.payload.command);
      }
    });
  }, []);

  return (
    <>
      <h1>Gpo - Slave</h1>
      <h2>Slave Extension</h2>
      {lastCommand && <p>Last received command: {lastCommand}</p>}
    </>
  );
}

export default App;
