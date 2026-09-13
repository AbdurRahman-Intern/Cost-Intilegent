/**
 * main.jsx
 *
 * ENTRY POINT of the application.
 *
 * WHAT HAPPENS HERE:
 * 1. React mounts the <App /> tree into the #root div (see index.html).
 * 2. We wrap the whole app in a single QueryClientProvider so that every
 *    component in the tree can use React Query hooks (useQuery/useMutation)
 *    to read and write server data.
 * 3. BrowserRouter enables client-side routing (see routes/AppRoutes.jsx).
 *
 * WHY REACT QUERY LIVES HERE:
 * React Query needs exactly ONE QueryClient instance shared by the whole
 * app. Creating it at the top level (outside the component, so it isn't
 * re-created on every render) and providing it once here is the standard
 * pattern.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Mock data never goes "stale" from our side, so we relax the
      // default aggressive refetching. TODO: tune this once real
      // Laravel endpoints are in place (shorter staleTime for live prices).
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
