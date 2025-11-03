import kaplay from "kaplay";
import { registerGamePlayScene } from "./scenes/gameplay";
import { registerOverScene } from "./scenes/over";
import { registerPromotionScene } from "./scenes/promotion";

const k = kaplay({ global: false });

k.loadRoot("./"); // A good idea for Itch.io publishing later

// defining constants
const C = {
	CELL_SIZE: 32,
	WALL_COLOR: "#000000",
	PLAYER_SPEED: 10,
	GHOST_SPEED: 8,
	BAG_CAPACITY: 2,
};

k.data = {
	paused: false, // pauses the player physics and player camera movement and player movement too
	life: 3,
};

registerGamePlayScene({ k, c: C, name: "startgame" });
registerOverScene({ k, c: C, name: "gameover" });
registerPromotionScene({ k, c: C, name: "promotion" });

k.loadSprite("flashlight", "sprites/flashlight.png");
k.loadSprite("help", "sprites/api_book.png");
k.loadSprite("pumpkin", "sprites/pumpka.png");
k.loadSprite("fuse", "sprites/sparkles.png");
k.loadSprite("player", "sprites/dracula.png");
k.loadSprite("sword", "sprites/sword.png");
k.loadSprite("steel", "sprites/steel.png");

k.loadSound("attack", "sounds/attack.mp3");
k.loadSound("background", "sounds/background.mp3");
k.loadSound("eat", "sounds/eat.mp3");
k.loadSound("footstep", "sounds/footstep.mp3");
k.loadSound("ghost-appear", "sounds/ghost-appear.mp3");
k.loadSound("ghost", "sounds/ghost.mp3");
k.loadSound("repair", "sounds/repair.mp3");

k.setLayers(
	[
		"bg", // walls and props
		"game", // players
		"ui", // text, HUD bar
	],
	"game"
);

k.go("startgame", 4);
