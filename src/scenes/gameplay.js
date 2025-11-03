import { getLevelData } from "../helpers/level";
import { Map } from "../objects/map";
import { Message } from "../objects/message";
import { Player } from "../objects/player";
import { UI } from "../objects/ui";

export function registerGamePlayScene({ k, name, c }) {
	// this is a 2d game with no gravity needed
	k.setGravity(0);

	k.scene(name, (level) => {
		// loading the level data to adjust the difficulty based on the level
		k.data = {
			...k.data,
			...getLevelData(level),
		};

		const background_sound = k.play("background");

		// creating the map
		Map({ k, c, level });

		// creating the first message
		level === 1 &&
			Message({
				k,
				text: 'Welcome to the game! Let me tell you a secret, "If you are stuck, watchout for the hints"',
			});

		const player = Player({ k, c });

		const ui = UI({ k, c, level });

		k.onUpdate(() => {
			// if game is completed
			if (k.data.fuse_dropped >= k.data.fuse_needed) {
				// clear the data for new level; LATER move this to first
				k.data = {
					...k.data,
					fuse_held: 0,
					life: 3,
					fuse_needed: 3,
					fuse_dropped: 0,
				};

				if (level < c.MAX_LEVEL) {
					k.go("promotion", level);
				} else {
					k.go("gamecomplete");
				}
			}

			if (k.data.life <= 0) {
				background_sound.stop();
				k.go("gameover", level);
			}
		});
	});
}
