export function Portal({ k, c }) {
	return [
		k.sprite("portal"),
		k.scale(1),
		k.area(),
		k.layer("game"),
		"portal",
		{
			add() {
				k.add([
					k.sprite("player"),
					k.pos(this.worldPos()),
					k.scale(1),
					k.area(),
					k.body(),
					k.z(1),
					k.anchor("center"),
					k.layer("game"),
					"player",
				]);
			},
		},
	];
}
