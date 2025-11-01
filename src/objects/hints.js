import { rem } from "../helpers/utils";
import { Message } from "./message";

export function Hints({ k, c }) {
	return [
		k.rect(rem(2), rem(2)),
		k.area(),
		k.color("#b8b8b8"),
		"hints",
		{
			add() {
				this.onCollide("player", async (player) => {
					let message = Message({
						k,
						c,
						text: "There are fuse spread across the screen.",
						keypress: false,
					});

					const last_fuse = k.get("fuse", { recursive: true }).at(-1).pos;
					player.paused = true;

					await k.tween(k.getCamPos(), last_fuse, 2, (pos) => k.setCamPos(pos));
					k.destroy(message);

					message = Message({
						k,
						c,
						text: "Grab these fuses. Note that you can only carry certain number of fuses defined by your bag capacity.",
						keypress: false,
					});

					await k.wait(1, () => {
						k.destroy(this);
						k.setCamPos(player.worldPos());
						player.paused = false;
					});
				});
			},
		},
	];
}
