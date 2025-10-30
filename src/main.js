import kaplay from "kaplay";
import { registerGamePlayScene } from "./scenes/gameplay";

const k = kaplay({ global: false });

k.loadRoot("./"); // A good idea for Itch.io publishing later

// defining constants
const CELL_SIZE = 32;
const WALL_COLOR = "#000000";
const PLAYER_SPEED = 10;

registerGamePlayScene({
	k,
	name: "map",
	c: {
		CELL_SIZE,
		WALL_COLOR,
		PLAYER_SPEED,
	},
});

k.go("map");
