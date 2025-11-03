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
			add() {
				// add logic to move horizontally up and down
				// add sound effects
				// add hit
				// add hit sound
			},
		},
	];
}
