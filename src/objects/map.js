import { rem } from "../helpers/utils";
import { Hints } from "./hints";

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

export function Map({ k, c }) {
	// create a background that stays for every scenes
	k.add([
		k.rect(k.width(), k.height()),
		k.pos(0, 0),
		k.anchor("topleft"),
		k.color("#f1faee"),
		k.fixed(),
	]);

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
			"?": Hints.bind(null, { k, c }),
		},
	});
}
