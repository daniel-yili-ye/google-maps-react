import { useState } from "react";
import { Input } from "./components/ui/input";

function App() {
  const [message, setMessage] = useState("");
  const [links, setLinks] = useState([]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (message) {
      setLinks([message, ...links]);
    }
    setMessage("");
  };

  return (
    <div className="container mx-auto py-6 max-w-xl space-y-6 px-6">
      <h1 className="font-bold text-3xl">🗺 Google Maps Route Optimizer</h1>
      <div className="flex items-center space-x-2 border border-slate-900 rounded-md w-full p-2">
        <div>🔍</div>
        <input
          type="text"
          className="w-full border-none outline-none"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></input>
        <button
          onClick={() => handleSubmit()}
          className="bg-slate-900 text-slate-100 hover:bg-slate-600 p-2 rounded-md whitespace-nowrap"
        >
          Optimize ⚡️
        </button>
      </div>
      {links ? (
        links.map((link) => (
          <div className="p-2 bg-slate-200 rounded-md space-y-2">
            <div className="flex bg-white rounded-md whitespace-nowrap overflow-auto ">
              <button className="p-2 border-r">📋</button>
              <div className="p-2">{link}</div>
            </div>
            <div className="flex bg-white rounded-md whitespace-nowrap overflow-auto ">
              <button className="p-2 border-r">📋</button>
              <div className="p-2">{link}</div>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
