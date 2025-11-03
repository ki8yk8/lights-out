export function registerPromotionScene({ k, c, name = "promotion" }) {
	k.scene(name, (level) => {
		k.add([
			k.rect(k.width(), k.height()),
			k.color("#ffffff"),
			k.anchor("topleft"),
			k.layer("bg"),
		]);

		k.add([
			k.text("Next Level", {
				size: 36,
			}),
			k.pos(k.width() / 2, k.height() / 3),
			k.anchor("top"),
			k.color("#000000"),
		]);
		k.add([
			k.text(level, {
				size: 64,
			}),
			k.pos(k.width() / 2, k.height() / 3 + 36 + 16),
			k.anchor("top"),
			k.color("#000000"),
		]);
		const hint = k.add([
			k.text("Press space to proceed to next level", {
				size: 28,
			}),
			k.pos(k.width() / 2, k.height() / 3 + 36 + 16 + 28 + 100),
			k.anchor("top"),
			k.color("#000000"),
			k.scale(1.0),
			k.animate({relative: true}),
		]);

		hint.animate("scale", [1.0, 1.1, 1.0], {
			duration: 1.2,
		})

		k.onKeyPress("space", () => {
			k.go("startgame", level + 1);
		});
	});
}
