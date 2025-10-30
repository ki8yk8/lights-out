import { rem } from "../helpers/utils";

export function Fuse({ k, c }) {
	return [
		k.rect(rem(2), rem(2)),
		k.pos(rem(-1), rem(-1)),
		k.color("#00ff00"),
		k.area(),
		"fuse",
	];
}
