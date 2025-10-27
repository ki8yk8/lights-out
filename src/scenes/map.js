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

	k.scene(name, () => {
		k.addLevel(MAP, {
			tileWidth: rem(1),
			tileHeight: rem(1),
			pos: k.vec2(rem(2), rem(2)),
			tiles: {
				"=": () => [k.rect(rem(1), rem(1)), k.color(WALL_COLOR), "wall"],
				"@": () => [k.rect(rem(1), rem(1)), k.color("#ff0000"), "player"],
				$: () => [k.rect(rem(1), rem(1)), k.color("#00ff00"), "fuse"],
				"?": () => [k.rect(rem(1), rem(1)), k.color("#b8b8b8"), "hints"],
			},
		});
	});
}
