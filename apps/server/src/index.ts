import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";

const PORT = Number(process.env.PORT) || 3000;
const clientDistPath = resolve(import.meta.dir, "../../web/dist");

export const app = new Elysia().use(cors()).group("/api", (app) =>
	app
		.get("/health", () => ({
			status: "ok",
			uptime: process.uptime(),
			timestamp: new Date().toISOString(),
		}))
		.get("/hello", () => ({
			message: "Hello from Elysia Server! 🦊",
			timestamp: new Date().toISOString(),
		})),
);

// Serve web frontend build assets in production if available
if (existsSync(clientDistPath)) {
	const indexHtmlPath = resolve(clientDistPath, "index.html");

	app.use(
		staticPlugin({
			assets: clientDistPath,
			prefix: "",
		}),
	);

	if (existsSync(indexHtmlPath)) {
		app.get("/", () => Bun.file(indexHtmlPath));
	}
}

app.listen(PORT);

console.log(
	`🦊 Elysia server is running at http://${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
