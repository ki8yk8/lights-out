import { rem } from "../helpers/utils";

export function Player({ k, c }) {
	const player = k.get("player", { recursive: true })[0];

	// handling physics and camera movement
	player.onUpdate(() => {
		// k.setCamPos(player.worldPos());
	});
	player.onPhysicsResolve(() => {
		// k.setCamPos(player.worldPos());
	});

	// handling player movement
	k.onKeyDown("up", () => {
		player.move(0, rem(-1) * c.PLAYER_SPEED);
	});
	k.onKeyDown("down", () => {
		player.move(0, rem(1) * c.PLAYER_SPEED);
	});
	k.onKeyDown("left", () => {
		player.move(rem(-1) * c.PLAYER_SPEED, 0);
	});
	k.onKeyDown("right", () => {
		player.move(rem(1) * c.PLAYER_SPEED, 0);
	});

	return player;
}
