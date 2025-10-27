import kaplay from "kaplay";
import { registerMapScene } from "./scenes/map";

const k = kaplay({ global: false });

k.loadRoot("./"); // A good idea for Itch.io publishing later

// defining constants
const CELL_SIZE = 32;
const WALL_COLOR = "#000000";
const PLAYER_SPEED = 10;

registerMapScene({
	k,
	name: "map",
	c: {
		CELL_SIZE,
		WALL_COLOR,
		PLAYER_SPEED,
	},
});

k.go("map");
