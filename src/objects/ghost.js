import { rem } from "../helpers/utils";

// new ghosts = & moves horizontally; first towards left
// new ghosts = % moves vertically; fist move towards up

export function Ghost({ k, c, horizontal = true }) {
	return [
		k.sprite("pumpkin"),
		k.area(),
		k.body(),
		k.layer("game"),
		k.scale(0.8),
		"ghost",
		{
			dir: {
				x: horizontal ? -1 : 0,
				y: horizontal ? 0 : -1,
			},
			add() {
				// this.vel.x = this.dir.x * rem(1) * c.GHOST_SPEED;
				// this.vel.y = this.dir.y * rem(1) * c.GHOST_SPEED;
				k.onUpdate(() => {
					this.move(
						this.dir.x * rem(1) * c.GHOST_SPEED,
						this.dir.y * rem(1) * c.GHOST_SPEED
					);
				});

				this.onCollide("wall", () => {
					if (horizontal) {
						this.dir.x *= -1;
						// this.vel.x = this.dir.x * rem(1) * c.GHOST_SPEED;
					} else {
						this.dir.y *= -1;
						// this.vel.y = this.dir.y * rem(1) * c.GHOST_SPEED;
					}
				});

				// add hit
				this.onCollide("player", async (player) => {
					k.data.life--;
					k.play("ghost");

					// player should be moved back to the portal
					const protal = k.get("portal", { recursive: true })[0];
					if (protal) {
						k.data.paused = true; // pause the game
						// k.play("hurt");

						// disappear the player
						await k.tween(1, 0, 1, (s) => {
							player.scaleTo(s);
						});

						// move the camera to focus the portal
						await k.tween(k.getCamPos(), protal.worldPos(), 1, (p) => {
							k.setCamPos(p);
						});

						// move the nonvisible player on top of the portal
						(player.pos = protal.worldPos()),
							// rescale the player
							await k.tween(0, 1, 1, (s) => {
								player.scaleTo(s);
							});

						k.data.paused = false;
					}
				});
			},
		},
	];
}
