const MAP = [
	"=================================",
	"=@  ?                           =",
	"=                               =",
	"=                               =",
	"=                               =",
	"=                               =",
	"=                               =",
	"=                               =",
	"=               $               =",
	"=================               =",
	"                =               =",
	"                =               =",
	"                =               =",
	"                =               =",
	"                =               =",
	"                =               =",
	"                =               =",
	"                =              $=",
	"                =================",
];
export function registerMapScene({ k, name, constants }) {
	const CELL_SIZE = constants.CELL_SIZE;
	const WALL_COLOR = constants.WALL_COLOR;

	function rem(n, base = CELL_SIZE) {
		return n * base;
	}

	k.setGravity(2400);

	k.scene(name, () => {
		const level = k.addLevel(MAP, {
			tileWidth: rem(1),
			tileHeight: rem(1),
			pos: k.vec2(rem(2), rem(2)),
			tiles: {
				"=": () => [
					k.rect(rem(1), rem(1)),
					k.color(WALL_COLOR),
					k.area(),
					k.body({ isStatic: true }),
					"wall",
				],
				"@": () => [
					k.rect(rem(2), rem(2)),
					k.color("#ff0000"),
					k.area(),
					k.body(),
					"player",
				],
				$: () => [
					k.rect(rem(2), rem(2)),
					k.pos(rem(-1), rem(-1)),
					k.color("#00ff00"),
					"fuse",
				],
				"?": () => [k.rect(rem(2), rem(1)), k.color("#b8b8b8"), "hints"],
			},
		});

		const player = level.get("player")[0];

		player.onUpdate(() => {
			k.setCamPos(player.worldPos());
		});
		player.onPhysicsResolve(() => {
			k.setCamPos(player.worldPos());
		});

		k.onKeyDown("up", () => {
			player.move(0, rem(1));
		});
		k.onKeyDown("left", () => {
			player.move(rem(-1), 0);
		});
		k.onKeyDown("down", () => {
			player.move(rem(1), 0);
		});
		k.onKeyDown("right", () => {
			player.move(rem(-1), 0);
		});
	});
}
