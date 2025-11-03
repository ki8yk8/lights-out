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
				this.vel.x = this.dir.x * rem(1) * c.GHOST_SPEED;
				this.vel.y = this.dir.y * rem(1) * c.GHOST_SPEED;

				this.onCollide("wall", () => {
					if (horizontal) {
						this.dir.x *= -1;
						this.vel.x = this.dir.x * rem(1) * c.GHOST_SPEED;
					} else {
						this.dir.y *= -1;
						this.vel.y = this.dir.y * rem(1) * c.GHOST_SPEED;
					}
				});

				// add hit
				this.onCollide("player", () => {
					k.data.life--;
					k.play("ghost");
				});
			},
		},
	];
}
