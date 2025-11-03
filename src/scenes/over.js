export function registerOverScene({ k, c, name = "gameover" }) {
	k.scene(name, (level) => {
		k.add([
			k.rect(k.width(), k.height()),
			k.anchor("topleft"),
			k.color("#ffffff"),
			k.layer("bg"),
		]);
		// structure is You Died At  then below Level with big letters then below press space to continue;
		k.add([
			k.text("You couldn't complete", {
				size: 36,
			}),
			k.color("#000000"),
			k.anchor("top"),
			k.pos(k.width() / 2, k.height() / 3),
		]);
		k.add([
			k.text(`Level ${level}`, {
				size: 64,
			}),
			k.color("#000000"),
			k.anchor("top"),
			k.pos(k.width() / 2, k.height() / 3 + 36 + 16),
		]);

		const hint = k.add([
			k.text("Press space to continue", {
				size: 24,
			}),
			k.color("#000000"),
			k.anchor("top"),
			k.pos(k.width() / 2, k.height() / 3 + 36 + 16 + 64 + 100),
			k.rotate(0),
			k.scale(1.0),
			k.animate({ relative: true }),
		]);

		hint.animate("scale", [1.0, 1.08, 1.0], {
			duration: 1,
		});
		hint.animate("angle", [2, 0, -2, 0, 2], {
			duration: 2,
		})

		k.onKeyPress("space", () => {
			k.go("startgame", level);
		});
	});
}
