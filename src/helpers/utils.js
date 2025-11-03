export function rem(n, base = 32) {
	return n * base;
}

export function doubleDigit(digit) {
	let string = `${digit}`;
	if (string.length >= 2) return string;

	return `0${string}`;
}

export function getScreenPosForObjAt(k, obj, sx, sy) {
	const desired_screen_pos = k.vec2(sx, sy);
	let target_world_pos = obj.pos;

	const screen_center = k.vec2(k.width() / 2, k.height() / 2);

	let anchor_offset = k.vec2(0, 0);
	if (obj.width && obj.height && obj.anchor) {
		anchor_offset = k.vec2(
			obj.width * (0.5 - obj.anchor.x),
			obj.height * (0.5 - obj.anchor.y)
		);
	}
	target_world_pos.add(anchor_offset);

	return target_world_pos.sub(desired_screen_pos.sub(screen_center));
}
