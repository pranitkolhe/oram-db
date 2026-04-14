import { useState } from "react";
import LogsPanel from "../components/LogsPanel";
import Tree from "../components/Tree";
export default function Home() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [readKey, setReadKey] = useState("");
  const [result, setResult] = useState("");
  const [path, setPath] = useState([]);
  const [logs, setLogs] = useState([]);

  const BASE_URL = "http://localhost:4000";

const writeData = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/write`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key, value }),
    });

    if (!res.ok) {
      throw new Error("Server error");
    }

    const data = await res.json();
    setResult(data.message);
    setLogs(data.logs || []);
    setPath(data.path || []);
  } catch (err) {
    console.error(err);
    setResult("Error writing data");
  }
};
  const readData = async () => {
    if (!readKey) {
      alert("Enter a key");
      return;
    }

    const res = await fetch(
      `${BASE_URL}/api/read/${encodeURIComponent(readKey)}`
    );
    const data = await res.json();

    setResult(data ? data.block_value : "Not found");
    setLogs(data.logs || []);
    setPath(data.path || []);
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>🔐 ORAM</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>Write Data</li>
          <li>Read Data</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main">
        <h1>ORAM Secure Database</h1>

        <div className="cards">
          {/* Write Card */}
          <div className="card">
            <h2>Write Data</h2>

            <input
              type="text"
              placeholder="Enter Key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />

            <input
              type="text"
              placeholder="Enter Value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <button className="writeBtn" onClick={writeData}>
              Store Securely
            </button>
          </div>

          {/* Read Card */}
          <div className="card">
            <h2>Read Data</h2>

            <input
              type="text"
              placeholder="Enter Key"
              value={readKey}
              onChange={(e) => setReadKey(e.target.value)}
            />

            <button className="readBtn" onClick={readData}>
              Fetch Data
            </button>
          </div>
        </div>

        {/* Result Panel */}
        <div className="resultBox">
          <h3>Result</h3>
          <p>{result || "No data yet..."}</p>
        </div>

        <LogsPanel />

        <div className="treeBox">
          <h3>🌳 ORAM Tree Visualization</h3>
          <Tree path={path} />
        </div>
      </div>
    </div>
  );
}