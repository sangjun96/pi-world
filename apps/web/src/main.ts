import { treaty } from "@elysiajs/eden";
import type { App } from "@pi-world/server";
import gsap from "gsap";
import { Application, Container, Graphics, Text, TextStyle } from "pixi.js";

// 1. Connect Eden Treaty to Elysia backend with full type safety
const api = treaty<App>(window.location.origin);

async function init() {
	const statusElem = document.getElementById("server-status");

	// 2. PixiJS v8 Application setup
	const app = new Application();
	await app.init({
		resizeTo: window,
		backgroundColor: 0x09090b,
		antialias: true,
		resolution: window.devicePixelRatio || 1,
		autoDensity: true,
		roundPixels: true,
	});

	document.body.appendChild(app.canvas);

	// 3. Create minimal geometric node
	const node = new Container();
	node.position.set(app.screen.width / 2, app.screen.height / 2);
	app.stage.addChild(node);

	const orbit = new Graphics()
		.circle(0, 0, 48)
		.stroke({ width: 1, color: 0xffffff, alpha: 0.14 })
		.poly([0, -34, 34, 0, 0, 34, -34, 0])
		.stroke({ width: 1, color: 0xffffff, alpha: 0.28 });

	const core = new Graphics()
		.circle(0, 0, 16)
		.fill({ color: 0xffffff, alpha: 0.05 })
		.circle(0, 0, 3.5)
		.fill({ color: 0xf4f4f5 });

	// 4. Create subtle instruction text
	const label = new Text({
		text: "CLICK ANYWHERE",
		style: new TextStyle({
			fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
			fontSize: 11,
			fontWeight: "500",
			letterSpacing: 3,
			fill: 0x71717a,
		}),
		resolution: window.devicePixelRatio || 1,
		roundPixels: true,
	});
	label.anchor.set(0.5);
	label.y = 84;

	node.addChild(orbit, core, label);

	// 5. GSAP idle animations & interactive quickTo
	gsap.to(orbit, {
		rotation: Math.PI * 2,
		duration: 24,
		repeat: -1,
		ease: "none",
	});
	gsap.to(orbit.scale, {
		x: 1.05,
		y: 1.05,
		duration: 2,
		repeat: -1,
		yoyo: true,
		ease: "sine.inOut",
	});

	const moveX = gsap.quickTo(node, "x", { duration: 0.6, ease: "power3.out" });
	const moveY = gsap.quickTo(node, "y", { duration: 0.6, ease: "power3.out" });

	app.stage.eventMode = "static";
	app.stage.hitArea = app.screen;
	app.stage.on("pointerdown", (event) => {
		moveX(event.global.x);
		moveY(event.global.y);
		gsap.fromTo(
			core.scale,
			{ x: 1.8, y: 1.8 },
			{ x: 1, y: 1, duration: 0.6, ease: "expo.out", overwrite: true },
		);
	});

	// 6. Request Elysia backend with Eden Treaty
	try {
		const response = await api.api.hello.get();
		if (response.data && statusElem) {
			statusElem.textContent = `● 연결됨 · ${response.data.message}`;
			statusElem.style.color = "#a1a1aa";
		} else if (response.error && statusElem) {
			statusElem.textContent = "● 서버 응답 오류";
			statusElem.style.color = "#f87171";
		}
	} catch {
		if (statusElem) {
			statusElem.textContent = "○ 서버 오프라인";
			statusElem.style.color = "#71717a";
		}
	}
}

init();
