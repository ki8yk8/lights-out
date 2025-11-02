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

function transposeMatrix(mat) {
	return mat[0].map((_, colIndex) => mat.map((row) => row[colIndex]));
}

function getSurroundingIndices(x, y, max_cols, max_rows, radius = 1) {
	const surrounding_indices = [
		[x - 1, y],
		[x - 1, y - 1],
		[x, y - 1],
		[x + 1, y - 1],
		[x + 1, y],
		[x + 1, y + 1],
		[x, y + 1],
		[x - 1, y + 1],
	];
	const valid_neighbours = surrounding_indices.filter(([i, j]) => {
		return i >= 1 && j >= 1 && i < max_cols && j < max_rows;
	});

	if (radius <= 1) {
		return valid_neighbours;
	}

	let all_neighbours = [...valid_neighbours];
	for (const [i, j] of valid_neighbours) {
		all_neighbours = [
			...all_neighbours,
			...getSurroundingIndices(i, j, max_cols, max_rows, radius - 1),
		];
	}

	return all_neighbours;
}

function getValidAreas(map_layout) {
	// '=' = wall, " " = donot use, "V" = valid
	let valid_area = map_layout.map((row) => {
		const [first, last] = [row.indexOf("="), row.lastIndexOf("=")];

		return row.map((elem, index) => {
			if (elem === "=") return "=";
			if (index > first && index < last && elem === " ") {
				// inside the two limits of wall
				return "V";
			}
			return " ";
		});
	});

	return valid_area;
}

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

	function getRandomPosInsideWall() {
		const arrayed_map_layout = map_layout.map((row) => row.split(""));
		const horizontally_valid = getValidAreas(arrayed_map_layout);
		const vertically_valid = transposeMatrix(
			getValidAreas(transposeMatrix(arrayed_map_layout))
		);

		// full valid = valid in both
		let fully_valid = [...arrayed_map_layout];
		fully_valid = fully_valid.map((row, i) => {
			return row.map((elem, j) => {
				if (
					horizontally_valid[i][j] === "V" &&
					vertically_valid[i][j] === "V"
				) {
					return "V";
				} else {
					return " ";
				}
			});
		});

		// if the surroundign is also valid then, only valid
		fully_valid = fully_valid.map((row, j) => {
			return row.map((elem, i) => {
				if (elem !== "V") return elem;

				const neighbours = getSurroundingIndices(
					i,
					j,
					fully_valid.length,
					fully_valid[0].length,
					2
				);

				const neighbours_valid = neighbours.every(([x, y]) => {
					return fully_valid[y][x] === "V";
				});

				return neighbours_valid ? "V" : " ";
			});
		});

		const flattened_valid = fully_valid.flat();
		const total_valids = flattened_valid.reduce((acc, elem) => {
			if (elem === "V") {
				return acc + 1;
			}
			return acc;
		}, 0);

		const random_number = Math.floor(Math.random() * total_valids);

		const valid_indices = [];
		flattened_valid.forEach((item, index) => {
			if (item === "V") valid_indices.push(index);
		});

		const flattened_index = valid_indices[random_number];

		// if (flattened_valid[flattened_index] !== "V") {
		// 	throw new Error("Flattened wrong");
		// }

		const [y, x] = [
			Math.floor(flattened_index / arrayed_map_layout[0].length),
			flattened_index % arrayed_map_layout[0].length,
		];

		// if (fully_valid[y][x] !== "V") {
		// 	throw Error(index);
		// }

		return k.vec2(x * tile_w + rem(1), y * tile_ht + rem(1));
	}

	// spawning the ghosts
	Ghost({ k, c, pos: getRandomPosInsideWall() });
	// k.loop(k.data.ghost_interval, () => {
	// 	let ghost = Ghost({ k, c, pos: getRandomPosInsideWall() });
	// 	k.wait(k.data.ghost_lasts, () => k.destroy(ghost));
	// });

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
