import { rem } from "../helpers/utils";
import { ElectricalBox } from "./electrical-box";
import { Fuse } from "./fuse";
import { Ghost } from "./ghost";
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
	const [tile_w, tile_ht] = [rem(1), rem(1)];
	const [wall_w, wall_ht] = [rem(1), rem[1]];
	const start_pos = k.vec2(rem(2), rem(2));
	const map_layout = MAP_LAYOUTS[level];

	// create a background that stays for every scenes
	const darkness = k.add([
		k.rect(k.width(), k.height()),
		k.color(255, 255, 255),
		k.pos(0, 0),
		k.anchor("topleft"),
		k.fixed(),
		k.layer("bg"),
	]);

	function getRandomPosInsideWall() {
		const pos_array = [...map_layout];

		let valid_area = pos_array.map((row) => {
			const [first, last] = [row.indexOf("="), row.lastIndexOf("=")];

			return row.split("").map((elem, index) => {
				if (index >= first && index <= last && elem === " ") {
					// inside the two limits of wall
					return "V";
				}
				return " ";
			});
		});

				
	}

	getRandomPosInsideWall();

	// spawning the ghosts
	k.loop(1, () => {
		const ghost = Ghost({ k, c });
		k.wait(1, () => k.destroy(ghost));
	});

	k.addLevel(map_layout, {
		tileWidth: tile_w,
		tileHeight: tile_ht,
		pos: start_pos,
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
				k.z(1),
				k.layer("game"),
				"player",
			],
			$: Fuse.bind(null, { k, c }),
			"?": Hints.bind(null, { k, c }),
			"#": ElectricalBox.bind(null, { k, c }),
		},
	});
}
