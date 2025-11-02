import kaplay from "kaplay";
import { registerGamePlayScene } from "./scenes/gameplay";

const k = kaplay({ global: false });

k.loadRoot("./"); // A good idea for Itch.io publishing later

// defining constants
const CELL_SIZE = 32;
const WALL_COLOR = "#000000";
const PLAYER_SPEED = 10;
const BAG_CAPACITY = 2;
const LEVEL_TIME = {
	minutes: 10,
	seconds: 0,
};

k.data = {
	paused: false, // pauses the player physics and player camera movement and player movement too
	fuse_held: 0,
	life: 3,
	fuse_needed: 3,
	fuse_dropped: 0,
};

registerGamePlayScene({
	k,
	name: "map",
	c: {
		CELL_SIZE,
		WALL_COLOR,
		PLAYER_SPEED,
		BAG_CAPACITY,
		LEVEL_TIME,
	},
});

k.loadSprite("flashlight", "sprites/flashlight.png");

k.setLayers(
	[
		"bg", // walls and props
		"game", // player, ghosts, items
		"lights", // darkness, mask
		"ui", // text, HUD bar
	],
	"game"
);

k.go("map", 1);
