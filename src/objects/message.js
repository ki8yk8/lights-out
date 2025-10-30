export function Message({ k, text, c }) {
	const message = k.add([
		k.rect(k.width() - 40, k.height() / 3),
		k.pos(40, (k.height() * 2) / 3 - 20),
		k.anchor("topleft"),
		k.fixed(),
		k.z(2),
		k.color("#080808"),
		k.outline(1, k.Color.fromHex("#ffffff")),
	]);

	message.add([
		k.text(text, {
			size: 32,
			width: k.width() - 40 - 40 * 2,
		}),
		k.pos(40),
	]);

	const resume_hint = message.add([
		k.text("Press any key to resume", {
			size: 16,
		}),
		k.pos(40, k.height() / 3 - 40),
		k.animate({ relative: true }),
		k.scale(1),
	]);

	resume_hint.animate("scale", [k.vec2(1.04), k.vec2(1), k.vec2(1.04)], {
		duration: 1,
	});

	k.onKeyPress(() => {
		if (message.exists()) {
			k.destroy(message);
		}
	});

	return message;
}
