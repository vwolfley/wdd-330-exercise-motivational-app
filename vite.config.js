import { resolve } from "path";
import { defineConfig } from "vite";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

export default defineConfig({
    root: "src/",
    server: {
        host: "localhost",
        port: 3000,
        open: true,
    },
    base: "/wdd-330-exercise-motivational-app/",
    build: {
        outDir: "../dist",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
            },
        },
    },
});
