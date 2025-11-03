import { MAP_LAYOUTS } from "../helpers/level";
import { rem } from "../helpers/utils";
import { ElectricalBox } from "./electrical-box";
import { Fuse } from "./fuse";
import { Ghost } from "./ghost";
import { Hints } from "./hints";
import { Portal } from "./portal";

export function Map({ k, c, level }) {
	const [tile_w, tile_ht] = [rem(1), rem(1)];
	const [wall_w, wall_ht] = [rem(1), rem[1]];
	const start_pos = k.vec2(rem(2), rem(2));
	const map_layout = MAP_LAYOUTS[level];

	// create a background that stays for every scenes
	k.add([
		k.rect(k.width(), k.height()),
		k.color(255, 255, 255),
		k.pos(0, 0),
		k.anchor("topleft"),
		k.fixed(),
		k.layer("bg"),
	]);

	k.addLevel(map_layout, {
		tileWidth: tile_w,
		tileHeight: tile_ht,
		pos: start_pos,
		tiles: {
			"=": () => [
				k.sprite("steel"),
				k.scale(0.5),
				k.area(),
				k.body({ isStatic: true }),
				k.layer("bg"),
				"wall",
			],
			"@": Portal.bind(null, { k, c }),
			"&": Ghost.bind(null, { k, c, horizontal: true }),
			"%": Ghost.bind(null, { k, c, horizontal: false }),
			$: Fuse.bind(null, { k, c }),
			"?": Hints.bind(null, { k, c }),
			"#": ElectricalBox.bind(null, { k, c }),
		},
	});
}
