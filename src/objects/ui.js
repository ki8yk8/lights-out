export function UI({ k, c }) {
	// this is fixed and not affected by the camera movement
	const ui = k.add([k.fixed(), "ui"]);

	// time elpased
	const timer = ui.add([
		k.text(`Time Left: 10:00`, {
			size: 24,
		}),
		k.pos(0, 0),
		k.color("#000000"),
		"timer",
	]);

	// life
	const life = ui.add([
		k.text(`Life: ${k.data.life ?? 1}`, {
			size: 24,
		}),
		k.pos(k.width(), 0),
		k.anchor("topright"),
		k.color("#000000"),
		"life",
	]);

	// bag capacity
	const bag = ui.add([
		k.text(`Bag: ${k.data.fuse_held ?? 0}/${c.BAG_CAPACITY}`, {
			size: 24,
		}),
		k.pos(k.width(), life.pos.y + life.height + 6),
		k.color("#000000"),
		k.anchor("topright"),
		"bag",
	]);

	return ui;
}
