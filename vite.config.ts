import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  preview: {
    host: "0.0.0.0", // listen on all interfaces for nginx/proxy
    port: 3000,      // must match your pm2-start.sh and health check
    strictPort: true,
    allowedHosts: [
      "theannualreports.com",
      "www.theannualreports.com", // keep or remove if you don't use www
    ],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
