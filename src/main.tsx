import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "index.css";
import browserServiceWorker from "mocks/browserServiceWorker.ts";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { WindowProvider } from "context/WindowContext.tsx";

if (process.env.NODE_ENV === "development") {
  browserServiceWorker.start({
    onUnhandledRequest: "warn",
  });
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error(String(error));
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WindowProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WindowProvider>
  </React.StrictMode>
);
