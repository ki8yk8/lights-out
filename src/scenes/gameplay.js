import { Map } from "../objects/map";
import { Message } from "../objects/message";
import { Player } from "../objects/player";

export function registerGamePlayScene({ k, name, c }) {
	// this is a 2d game with no gravity needed
	k.setGravity(0);

	k.scene(name, () => {
		// creating the map
		Map({ k, c });

		// creating the first message
		Message({
			k,
			text: 'Welcome to the game! Let me tell you a secret, "If you are stuck, watchout for the hints"',
		});

		const player = Player({ k, c });
	});
}
