import { rem } from "../helpers/utils";
import { Player } from "../objects/player";

const MAP_LAYOUT = [
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

export function registerMapScene({ k, name, c }) {
	// this is a 2d game with no gravity needed
	k.setGravity(0);

	k.scene(name, () => {
		k.addLevel(MAP_LAYOUT, {
			tileWidth: rem(1),
			tileHeight: rem(1),
			pos: k.vec2(rem(2), rem(2)),
			tiles: {
				"=": () => [
					k.rect(rem(1), rem(1)),
					k.color(c.WALL_COLOR),
					k.area(),
					k.body({ isStatic: true }),
					"wall",
				],
				"@": () => [
					k.rect(rem(2), rem(2)),
					k.color("#ff0000"),
					k.area(),
					k.body(),
					k.z(1),
					"player",
				],
				$: () => [
					k.rect(rem(2), rem(2)),
					k.pos(rem(-1), rem(-1)),
					k.color("#00ff00"),
					k.area(),
					"fuse",
				],
				"?": () => [
					k.rect(rem(2), rem(1)),
					k.area(),
					k.color("#b8b8b8"),
					"hints",
				],
			},
		});

		const player = Player({ k, c });
	});
}
