import { rem } from "../helpers/utils";

// new ghosts = & moves horizontally; first towards left
// new ghosts = % moves vertically; fist move towards up

export function Ghost({ k, c, horizontal = true }) {
	return [
		k.sprite("pumpkin", {
			width: rem(1.2),
			height: rem(1.2),
		}),
		k.area(),
		k.body(),
		k.layer("game"),
		k.scale(1),
		"ghost",
		{
			god_paused: false,
			dir: {
				x: horizontal ? -1 : 0,
				y: horizontal ? 0 : -1,
			},
			add() {
				const ghost_emitter = k.add([
					k.pos(k.center()),
					k.particles(
						{
							max: 40,
							speed: [40, 90],
							lifetime: [0.4, 0.9],
							angle: [0, 360],
							opacities: [1.0, 0.0],
							colors: [k.rgb(195, 107, 63)],
							scale: [1.0, 0.4],
						},
						{ direction: 0, spread: 360 }
					),
				]);

				// this.vel.x = this.dir.x * rem(1) * c.GHOST_SPEED;
				// this.vel.y = this.dir.y * rem(1) * c.GHOST_SPEED;
				k.onUpdate(() => {
					!this.god_paused && this.move(
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
					if (k.data.god_mode) {
						this.god_paused = true;
						
						// blast the ghost emittor
						ghost_emitter.pos.x = this.pos.x + this.width / 2;
						ghost_emitter.pos.y = this.pos.y + this.height;
						
						ghost_emitter.emit(30);
						k.wait(1, () => k.destroy(ghost_emitter));
						// scale down the ghost to zero
						await k.tween(1.0, 0.0, 0.7, (s) => {
							this.scaleTo(s);
						});

						// destry the ghost
						this.exists() && k.destroy(this);
						return;
					}

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
