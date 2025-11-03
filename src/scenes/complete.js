export function registerGameCompleteScene({ k, c, name }) {
	k.scene(name, () => {
		k.add([
			k.rect(k.width(), k.height()),
			k.color("ffffff"),
			k.pos(0, 0),
			k.anchor("topleft"),
		]);

		k.add([
			k.text("Congratulations", {
				size: 64,
			}),
			k.anchor("top"),
			k.pos(k.width() / 2, k.height() / 3),
			k.color("#000000"),
		]);

		k.add([
			k.text("You have completed the game.", {
				size: 32,
			}),
			k.anchor("top"),
			k.pos(k.width() / 2, k.height() / 3 + 64 + 16),
			k.color("#000000"),
		]);

		k.add([
			k.text("Press space to continue from start.", {
				size: 28,
			}),
			k.anchor("top"),
			k.pos(k.width() / 2, k.height() / 3 + 64 + 16 + 100 + 32),
			k.color("#000000"),
		]);

		k.onKeyPress("space", () => {
			k.go("startgame", 1);	
		})
	});
}
