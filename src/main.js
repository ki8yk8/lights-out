import kaplay from "kaplay";
import { registerMapScene } from "./scenes/map";

const k = kaplay({ global: false });

k.loadRoot("./"); // A good idea for Itch.io publishing later

// defining constants
const CELL_SIZE = 32;
const WALL_COLOR = "#000000";

registerMapScene({
	k,
	name: "map",
	constants: {
		CELL_SIZE,
		WALL_COLOR,
	},
});

k.go("map");
