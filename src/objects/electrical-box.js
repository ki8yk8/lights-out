import { rem } from "../helpers/utils";
import { Message } from "./message";

export function ElectricalBox({ k, c }) {
	return [
		k.rect(rem(4), rem(2)),
		k.color("#0000ff"),
		k.area(),
		k.pos(rem(-3), rem(0)),
		"electrical-box",
		{
			add() {
				this.add([
					k.text(`${k.data.fuse_dropped}/${k.data.fuse_needed}`),
					k.color("#000000"),
					k.pos(this.width / 2, this.height / 2),
					k.anchor("center"),
					"message",
				]);

				this.onCollide("player", () => {
					if (k.data.fuse_held === 0) {
						Message({ k, c, text: "Collect the fuses and drop them here" });
					} else {
						k.data.fuse_dropped += k.data.fuse_held;
						k.data.fuse_held = 0;
						k.play("repair");

						this.get(
							"message"
						)[0].text = `${k.data.fuse_dropped}/${k.data.fuse_needed}`;
					}
				});
			},
		},
	];
}
