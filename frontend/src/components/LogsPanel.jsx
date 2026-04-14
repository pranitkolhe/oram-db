import { useEffect, useState } from "react";

export default function LogsPanel() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/logs");
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  // auto refresh logs
  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="logsPanel">
      <h2>📊 ORAM Activity Logs</h2>

      {logs.length === 0 ? (
        <p>No activity yet...</p>
      ) : (
        logs.map((log, index) => (
          <div key={index} className={`logCard ${log.type}`}>
            <p><strong>{log.type}</strong> | {log.time}</p>
            <p>Key: {log.key}</p>
            <p>{log.message}</p>
            {log.result && <p>Result: {log.result}</p>}
            <p>Stash Size: {log.stash}</p>
          </div>
        ))
      )}
    </div>
  );
}