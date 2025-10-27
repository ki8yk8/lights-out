export function ui({ k, c }) {
	// this is fixed and not affected by the camera movement
	const ui = k.add([k.fixed()]);

	return ui;
}
