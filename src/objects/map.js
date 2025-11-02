import { rem } from "../helpers/utils";
import { ElectricalBox } from "./electrical-box";
import { Fuse } from "./fuse";
import { Hints } from "./hints";

const MAP_LAYOUTS = {
	1: [
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
		"                =$             $=",
		"                =================",
	],
	2: [
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
		"                =$             $=",
		"                =================",
	],
};

export function Map({ k, c, level }) {
	// create a background that stays for every scenes
	const darkness = k.add([
		k.rect(k.width(), k.height()),
		k.color(0, 0, 0),
		k.opacity(0.95),
		k.pos(0, 0),
		k.anchor("topleft"),
		k.fixed(),
		k.layer("lights-dark"),
	]);

	k.addLevel(MAP_LAYOUTS[level], {
		tileWidth: rem(1),
		tileHeight: rem(1),
		pos: k.vec2(rem(2), rem(2)),
		tiles: {
			"=": () => [
				k.rect(rem(1), rem(1)),
				k.color(c.WALL_COLOR),
				k.area(),
				k.body({ isStatic: true }),
				k.layer("bg"),
				"wall",
			],
			"@": () => [
				k.rect(rem(2), rem(2)),
				k.color("#ff0000"),
				k.area(),
				k.body(),
				// k.z(1),
				k.layer("game"),
				"player",
			],
			$: Fuse.bind(null, { k, c }),
			"?": Hints.bind(null, { k, c }),
			"#": ElectricalBox.bind(null, { k, c }),
		},
	});
}
