import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Switch } from "./components/ui/switch";

function App() {
  const [routeInfo, setRouteInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const startEnd = routeInfo
    ? [
        routeInfo.destinations[0],
        routeInfo.destinations[routeInfo.destinations.length - 1],
      ].map((x) => x.replace(/\+/g, " "))
    : [];

  function getRedirectedURL(url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var redirectedURL = xhr.responseURL;
        callback(redirectedURL);
      }
    };

    xhr.open("HEAD", url);
    xhr.send();
  }

  // Example usage
  var inputURL = "http://google.com";

  getRedirectedURL(inputURL, function (redirectedURL) {
    console.log("Redirected URL:", redirectedURL);
  });

  const apiEndpoint = import.meta.env.VITE_REACT_APP_API_ENDPOINT;
  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      setRouteInfo(responseData);
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto py-6 max-w-xl space-y-6 px-6 min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50">
      <h1 className="font-bold text-5xl">Google Maps Route Optimizer 🌎</h1>
      <p>
        Enter your Google Maps URL with multiple stops 📍🗺️🚗 and let us 🤖
        calculate an optimal route 🧭 for you! 🎉
      </p>
      {/* <Separator /> */}
      <Form.Root
        className="space-y-4"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
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
        <Form.Field
          name="travel-mode"
          className="flex justify-between items-baseline"
        >
          <Form.Label className="font-bold">Travel Mode</Form.Label>
          <Form.Control asChild>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Driving" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="driving">Driving</SelectItem>
                <SelectItem value="walking">Walking</SelectItem>
                <SelectItem value="cycling">Cycling</SelectItem>
              </SelectContent>
            </Select>
          </Form.Control>
        </Form.Field>
        <Form.Field
          name="fixed-start-point"
          className="flex justify-between items-center"
        >
          <Form.Label className="font-bold">Fixed Start Point</Form.Label>
          <Form.Control asChild>
            <Switch>Toggle</Switch>
          </Form.Control>
        </Form.Field>
        <Form.Field
          name="fixed-end-point"
          className="flex justify-between items-center"
        >
          <Form.Label className="font-bold">Fixed End Point</Form.Label>
          <Form.Control asChild>
            <Switch>Toggle</Switch>
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild className="font-bold">
          {isLoading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button>Optimize ⚡️</Button>
          )}
        </Form.Submit>
      </Form.Root>
      {routeInfo ? (
        <Card>
          <CardHeader>
            <CardTitle>
              {startEnd[0]} ➡️ {startEnd[1]}
            </CardTitle>
            <CardDescription>
              You saved 8h 🧭, 340km 🗺, 34L of gas ⛽️ or approximately $568.99
              🤑!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-x-2">
            <Button>
              <a href={routeInfo.solution_url} target="_blank">
                New Route 🔗
              </a>
            </Button>
            <Button variant="subtle">
              <a href={routeInfo.url} target="_blank">
                Old Route 🔗
              </a>
            </Button>
          </CardContent>
          {/* <CardFooter>
            
          </CardFooter> */}
        </Card>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
