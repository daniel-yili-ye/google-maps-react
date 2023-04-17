import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

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
    <div className="container mx-auto py-6 max-w-xl space-y-6 px-6 min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50">
      <h1 className="font-bold text-6xl">Google Maps Route Optimizer 🌎</h1>
      <Form.Root className="space-y-4">
        <Form.Field name="url" className="space-y-2">
          <div className="flex items-baseline justify-between ">
            <Form.Label className="font-bold">Multi-Stop URL</Form.Label>
            <Form.Message match="valueMissing">
              Please enter your Google Maps URL
            </Form.Message>
            <Form.Message match="typeMismatch">
              Please provide a valid multi-stop Google Maps URL.
            </Form.Message>
          </div>
          <Form.Control asChild>
            <Input
              type="url"
              placeholder="https://google.com/maps/dir/..."
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild className="font-bold">
          <Button>Optimize ⚡️</Button>
        </Form.Submit>
      </Form.Root>
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
