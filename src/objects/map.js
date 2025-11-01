import { rem } from "../helpers/utils";
import { Fuse } from "./fuse";
import { Hints } from "./hints";

const MAP_LAYOUT = [
	"=================================",
	"=@  ?                          #=",
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
			$: Fuse.bind(null, { k, c }),
			"?": Hints.bind(null, { k, c }),
			"#": () => [
				k.rect(rem(4), rem(2)),
				k.color("#0000ff"),
				k.area(),
				k.pos(rem(-3), rem(0)),
				"electrical-box",
			],
		},
	});
}
