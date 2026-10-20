import { treaty } from "@elysiajs/eden";
import { Application, Graphics, Text, TextStyle } from "pixi.js";
import type { App } from "../../server/src/index";

// 1. Connect Eden Treaty to Elysia backend with full type safety
const api = treaty<App>(window.location.origin);

async function init() {
	const statusElem = document.getElementById("server-status");

	// 2. PixiJS v8 Application setup
	const app = new Application();
	await app.init({
		resizeTo: window,
		backgroundColor: 0x0f172a,
		antialias: true,
	});

	document.body.appendChild(app.canvas);

	// 3. Create interactive spinning visual element
	const star = new Graphics();
	star.star(0, 0, 5, 80, 40);
	star.fill({ color: 0x38bdf8 });
	star.stroke({ width: 3, color: 0xe0f2fe });
	star.x = app.screen.width / 2;
	star.y = app.screen.height / 2;
	app.stage.addChild(star);

	// 4. Create floating instruction text
	const style = new TextStyle({
		fontFamily: "sans-serif",
		fontSize: 16,
		fill: 0xffffff,
		align: "center",
	});
	const label = new Text({
		text: "Click or tap anywhere!",
		style,
	});
	label.anchor.set(0.5);
	label.x = app.screen.width / 2;
	label.y = app.screen.height / 2 + 120;
	app.stage.addChild(label);

	// 5. Animation loop
	app.ticker.add((ticker) => {
		star.rotation += 0.015 * ticker.deltaTime;
	});

	// 6. Interactive click event
	app.stage.eventMode = "static";
	app.stage.hitArea = app.screen;
	app.stage.on("pointerdown", (event) => {
		star.x = event.global.x;
		star.y = event.global.y;
		label.x = event.global.x;
		label.y = event.global.y + 120;
	});

	// 7. Request Elysia backend with Eden Treaty
	try {
		const response = await api.api.hello.get();
		if (response.data) {
			if (statusElem) {
				statusElem.textContent = `🟢 연결됨: ${response.data.message} (${new Date(response.data.timestamp).toLocaleTimeString()})`;
				statusElem.style.color = "#4ade80";
			}
		} else if (response.error) {
			if (statusElem) {
				statusElem.textContent = "🔴 서버 응답 오류";
				statusElem.style.color = "#f87171";
			}
		}
	} catch {
		if (statusElem) {
			statusElem.textContent = "⚠️ 서버 오프라인 (Elysia 미실행)";
			statusElem.style.color = "#fbbf24";
		}
	}
}

init();
