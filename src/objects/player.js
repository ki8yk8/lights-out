import { rem } from "../helpers/utils";

export function Player({ k, c }) {
	const player = k.get("player", { recursive: true })[0];

	// const light = k.add([
	// 	k.sprite("flashlight"),
	// 	k.pos(k.center()),
	// 	k.color(255, 255, 255),
	// 	k.blend(BlendMode.Add),
	// 	k.layer("lights"),
	// 	k.fixed(),
	// 	"flashlight",
		// ]);
	k.onDraw(() => {
		k.drawSprite({
			sprite: "flashlight",
			pos: player.worldPos(),
			anchor: "center",
		});
	})

	// handling physics and camera movement
	// flashlight follows the player
	player.onUpdate(() => {

		if (!k.data?.paused) k.setCamPos(player.worldPos());
	});
	player.onPhysicsResolve(() => {
		if (!k.data?.paused) k.setCamPos(player.worldPos());
	});

	// handling player movement
	k.onKeyDown("up", () => {
		!k.data?.paused && player.move(0, rem(-1) * c.PLAYER_SPEED);
	});
	k.onKeyDown("down", () => {
		!k.data?.paused && player.move(0, rem(1) * c.PLAYER_SPEED);
	});
	k.onKeyDown("left", () => {
		!k.data?.paused && player.move(rem(-1) * c.PLAYER_SPEED, 0);
	});
	k.onKeyDown("right", () => {
		!k.data?.paused && player.move(rem(1) * c.PLAYER_SPEED, 0);
	});

	return player;
}
