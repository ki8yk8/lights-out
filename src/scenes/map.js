export function registerMapScene({ k, name, constants }) {
	const CELL_SIZE = constants.CELL_SIZE;
	const WALL_COLOR = constants.WALL_COLOR;

	function rem(n, base = CELL_SIZE) {
		return n * base;
	}

	k.scene(name, () => {
		// creating the map borders
		k.add([
			k.rect(rem(0.5), rem(18)),
			k.pos(30, k.height() - rem(18) - rem(1)),
			k.color(WALL_COLOR),
			"wall",
		]);

		k.add([
			k.rect(rem(60), rem(0.5)),
			k.pos(30, k.height() - rem(18) - rem(1)),
			k.color(WALL_COLOR),
			"wall",
		]);

		k.add([
			k.rect(rem(70), rem(0.5)),
			k.pos(30, k.height() - rem(1)),
			k.color(WALL_COLOR),
			"wall",
		]);

		k.add([
			k.rect(rem(0.5), rem(18)),
			k.pos(30 + rem(60), k.height() - rem(18) - rem(0.5)),
			k.color(WALL_COLOR),
			k.anchor("bot"),
		]);
	});
}
