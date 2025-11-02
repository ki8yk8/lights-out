import { rem } from "../helpers/utils";
import { Message } from "./message";

export function Fuse({ k, c }) {
	return [
		k.rect(rem(2), rem(2)),
		k.pos(rem(-1), rem(-1)),
		k.color("#00ff00"),
		k.area(),
		k.layer("game"),
		"fuse",
		{
			add() {
				this.onCollide("player", (player) => {
					if (k.data.fuse_held >= c.BAG_CAPACITY) return;
					k.data.fuse_held += 1;

					// destroy the fuse
					k.destroy(this);
				});
			},
		},
	];
}
