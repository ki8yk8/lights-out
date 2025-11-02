import { getScreenPosForObjAt, rem } from "../helpers/utils";
import { Message } from "./message";

export function Hints({ k, c }) {
	return [
		k.rect(rem(2), rem(2)),
		k.area(),
		k.color("#b8b8b8"),
		k.layer("game"),
		"hints",
		{
			add() {
				this.onCollide("player", async (player) => {
					k.data.paused = true;
					let message = Message({
						k,
						c,
						text: "There are fuse spread across the screen.",
						keypress: false,
					});

					const last_fuse = k.get("fuse", { recursive: true }).at(-1);

					await k.tween(
						k.getCamPos(),
						getScreenPosForObjAt(k, last_fuse, k.width() / 2, k.height() / 3),
						2,
						(pos) => k.setCamPos(pos)
					);
					k.destroy(message);

					// show an arrow on the bag capacity too
					const bag = k.get("bag", { recursive: true })[0];
					const bag_pointer = k.add([
						k.rect(100, 100),
						k.pos(bag.pos.x - bag.width, bag.pos.y + bag.height),
						k.anchor("topright"),
						k.color("#ff00ff"),
						k.fixed(),
						k.scale(1),
						k.rotate(0),
						k.animate({ relative: true }),
					]);

					bag_pointer.animate("scale", [1, 1.08, 1], {
						duration: 1,
					});
					bag_pointer.animate("angle", [0, 15, -15, 0], {
						duration: 3,
					});

					async function showGrabFuse() {
						k.destroy(bag_pointer);

						// now tell the user to get to the electrical box
						await showElectrical();
					}

					async function showElectrical() {
						// get the user to see the electrical box
						const e_box = k.get("electrical-box", { recursive: true })[0];

						await k.tween(
							k.getCamPos(),
							getScreenPosForObjAt(k, e_box, k.width() / 2, k.height() / 3),
							1.5,
							(pos) => {
								k.setCamPos(pos);
							}
						);

						message = Message({
							k,
							c,
							text: "Bring those fuses to fix the electrical box. After certain number of fuse is collected lights turns on and you win.",
							onKeyPress: destroyHint,
						});
					}

					async function destroyHint() {
						// finally do this
						await k.tween(k.getCamPos(), player.worldPos(), 2, (pos) =>
							k.setCamPos(pos)
						);
						k.data.paused = false;
					}

					message = Message({
						k,
						c,
						text: "Grab these fuses. Note that you can only carry certain number of fuses defined by your bag capacity.",
						keypress: true,
						onKeyPress: showGrabFuse,
					});
				});
			},
		},
	];
}
