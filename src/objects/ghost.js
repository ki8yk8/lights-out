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
		k.pos(pos),
	]);

	return ghost;
}
