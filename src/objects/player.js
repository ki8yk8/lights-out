import { rem } from "../helpers/utils";

export function Player({ k, c }) {
	const player = k.get("player", { recursive: true })[0];

	// handling physics and camera movement
	player.onUpdate(() => {
		if (!k.data?.paused) k.setCamPos(player.worldPos());
	});
	player.onPhysicsResolve(() => {
		if (!k.data?.paused) k.setCamPos(player.worldPos());
	});

	// handling player movement
	k.onKeyDown("up", () => {
		!k.data?.paused && player.move(0, rem(-1) * c.PLAYER_SPEED);
		!k.data?.paused && k.play("footstep");
	});
	k.onKeyDown("down", () => {
		!k.data?.paused && player.move(0, rem(1) * c.PLAYER_SPEED);
		!k.data?.paused && k.play("footstep");
	});
	k.onKeyDown("left", () => {
		!k.data?.paused && player.move(rem(-1) * c.PLAYER_SPEED, 0);
		!k.data?.paused && k.play("footstep");
	});
	k.onKeyDown("right", () => {
		!k.data?.paused && player.move(rem(1) * c.PLAYER_SPEED, 0);
		!k.data?.paused && k.play("footstep");
	});

	return player;
}
