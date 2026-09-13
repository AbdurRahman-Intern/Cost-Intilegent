import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Standard Vite config with the React plugin (enables JSX + Fast Refresh).
export default defineConfig({
  baseUrl: "/Cost-Intilegent/",
  plugins: [react()],
});
