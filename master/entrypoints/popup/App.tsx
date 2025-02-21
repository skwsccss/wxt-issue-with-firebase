import { useState } from "react";
import "./App.css";
import { sendCommandToSlave } from "../background";

function App() {
  const [count, setCount] = useState(0);
  const [command, setCommand] = useState("");

  const handleSendCommand = async () => {
    await sendCommandToSlave(command);
    setCommand("");
  };
  return (
    <>
      <h1>Go - Master</h1>
      <div className="p-4">
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="border p-2 rounded"
          placeholder="Enter command"
        />
        <button
          onClick={handleSendCommand}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send Command
        </button>
      </div>
    </>
  );
}

export default App;
