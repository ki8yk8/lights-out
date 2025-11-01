import kaplay from "kaplay";
import { registerGamePlayScene } from "./scenes/gameplay";

const k = kaplay({ global: false });

k.loadRoot("./"); // A good idea for Itch.io publishing later

// defining constants
const CELL_SIZE = 32;
const WALL_COLOR = "#000000";
const PLAYER_SPEED = 10;
const BAG_CAPACITY = 2;

k.data = {
	paused: false, // pauses the player physics and player camera movement
	fuse_held: 0,
	life: 3,
};

registerGamePlayScene({
	k,
	name: "map",
	c: {
		CELL_SIZE,
		WALL_COLOR,
		PLAYER_SPEED,
		BAG_CAPACITY,
	},
});

k.go("map");
