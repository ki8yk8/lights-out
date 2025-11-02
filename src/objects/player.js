import { rem } from "../helpers/utils";

export function Player({ k, c }) {
	const player = k.get("player", { recursive: true })[0];

	const light = k.add([
		k.circle(100),
		k.color(255, 255, 255),
		// k.blend(k.BlendMode.Add),
		k.layer("lights-light"),
		k.anchor("center"),
		k.fixed(),
		"flashlight",
	]);

	// handling physics and camera movement
	player.onUpdate(() => {
		// flashlight follows the player
		light.pos = player.screenPos();

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
