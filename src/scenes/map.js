export function registerMapScene({ k, name }) {
	k.scene(name, () => {
		k.onDraw(() => {
			k.drawRect({
				width: k.width(),
				height: k.height(),
				pos: k.vec2(0, 0),
				anchor: "topleft",
				color: k.Color.fromHex("#ffffff"),
			});
		});
	});
}
