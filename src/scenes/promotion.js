export function registerPromotionScene({ k, c, name = "promotion" }) {
	k.scene(name, (level) => {
		k.add([
			k.text("Next level:" + level + 1, {
				size: 78,
			}),
			k.color("#000000"),
			k.anchor("center"),
		]);

		k.onKeyPress("space", () => {
			k.go("startgame", level + 1);
		});
	});
}
