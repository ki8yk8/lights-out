// Spawning = randomly spawns the ghost at random points every x seconds or so for x seconds
// Ghost movement = randomly moves and if human moves or does any action it hears the sound and follows toward it with speed = speed of human
// Human die = if ghost sees the human then, human gets locked in and ghost runs with double the speed, if ghost is able to catch it human dies

import { rem } from "../helpers/utils";

// Exception: might be hidden space where human can sit and escape ghost
export function Ghost({ k, c, pos }) {
	const ghost = k.add([
		k.rect(rem(2), rem(2)),
		k.anchor("center"),
		k.color("#ff00ff"),
		k.area(),
		k.body(),
		k.pos(pos),
		k.z(1),
		{
			dir: {
				x: 1,
				y: 0,
			},
			stuck_frames: 0,
			prev_pos: pos.clone(),
			player_last_pos: null,
		},
		"ghost",
	]);

	// every frame ghost moves in one direction straight
	ghost.onUpdate(() => {
		const player = k.get("player", { recursive: true })[0];
		if (player && !ghost.player_last_pos) {
			ghost.player_last_pos = player.pos;
		}
		// if the player moved
		if (player && player.pos.dist(ghost.player_last_pos) > 10) {
			ghost.player_last_pos = player.pos;
			// increase speed and run toward the player
			console.log("Player moved");
		}

		// move the ghost
		ghost.move(
			rem(1) * c.GHOST_SPEED * 0.5 * ghost.dir.x,
			rem(1) * c.GHOST_SPEED * 0.5 * ghost.dir.y
		);

		if (ghost.pos.dist(ghost.prev_pos) < 10) {
			ghost.stuck_frames += 1;
		} else {
			ghost.stuck_frames = 0;
			ghost.prev_pos = ghost.pos.clone();
		}

		if (ghost.stuck_frames > 60) {
			setRandomDirection();
			ghost.stuck_frames = 0;
		}
	});

	function setRandomDirection() {
		const filtered_configs = configs.filter(([x, y]) => {
			if (ghost.dir.x === x && ghost.dir.y === y) {
				return false;
			}
			return true;
		});

		const config =
			filtered_configs[Math.floor(Math.random() * filtered_configs.length)];
		ghost.dir.x = config[0];
		ghost.dir.y = config[1];
	}

	// when collide on wall randomly change orientation
	const configs = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
	];

	ghost.onCollide("wall", () => {
		setRandomDirection();
	});

	ghost.onCollide("player", () => {
		k.data.life--;
	});

	return ghost;
}
