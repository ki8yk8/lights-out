export function registerOverScene({ k, c, name = "gameover" }) {
	k.scene(name, (level) => {
		k.add([
			k.text("You couldn't survived" + level, {
				size: 72,
			}),
			k.color("#000000"),
			k.anchor("center"),
			k.pos(k.width() / 2, k.height() / 2),
		]);

		k.add([
			k.text("Press space to continue.", {
				size: 48,
			}),
			k.color("#000000"),
			k.anchor("center"),
			k.pos(k.width() / 2, k.height() / 2 + 72 + 16),
		]);

		k.onKeyPress("space", () => {
			k.go("startgame", level);
		});
	});
}
