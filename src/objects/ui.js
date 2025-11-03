import { doubleDigit } from "../helpers/utils";

export function UI({ k, c, level }) {
	// this is fixed and not affected by the camera movement
	const ui = k.add([k.fixed(), k.layer("ui"), "ui"]);
	let prev_data = { ...k.data };

	// god mode ui
	const god_rect = ui.add([
		k.rect(200, 50, {
			radius: 10,
		}),
		k.color(255, 0, 0),
		k.anchor("center"),
		k.pos(k.width() / 2, 50),
		k.scale(k.data.god_mode ? 1 : 0),
		k.animate({ relative: true }),
	]);

	god_rect.add([
		k.text("You are god", {
			size: 22,
		}),
		k.color("#ffffff"),
		k.anchor("center"),
		k.pos(0, 0),
	]);

	// time elpased
	const timer = ui.add([
		k.text(`Time Left: 10:00`, {
			size: 24,
		}),
		k.pos(25, 25),
		k.color("#000000"),
		k.timer(),
		"timer",
	]);

	console.log(k.data.time)
	// will implement this later because this may not be necessary at all.
	let timer_loop = timer.loop(1, () => {
		k.data.time.s--;
		if (k.data.time.s < 0 && k.data.time.m === 0) {
			k.go("gameover", level);
			timer_loop.cancel();
		}

		if (k.data.time.s < 0 && k.data.time.m > 0) {
			k.data.time.s = 59;
			k.data.time.m--;
		}

		timer.text = `Time Left: ${doubleDigit(k.data.time.m)}:${doubleDigit(
			k.data.time.s
		)}`;
	});

	// life
	const life = ui.add([
		k.text(`Life: ${k.data.life ?? 1}`, {
			size: 24,
		}),
		k.pos(k.width() - 25, 25),
		k.anchor("topright"),
		k.color("#000000"),
		"life",
	]);

	// bag capacity
	const bag = ui.add([
		k.text(`Bag: ${k.data.fuse_held ?? 0}/${c.BAG_CAPACITY}`, {
			size: 24,
		}),
		k.pos(k.width() - 25, life.pos.y + life.height + 6),
		k.color("#000000"),
		k.anchor("topright"),
		"bag",
	]);

	k.onUpdate(() => {
		const new_data = k.data;

		// dependency keys
		const DEPENDS = ["fuse_held", "life", "god_mode"];
		DEPENDS.forEach((depend) => {
			if (new_data[depend] !== prev_data[depend]) {
				prev_data = { ...prev_data, [depend]: new_data[depend] };

				if (depend === "fuse_held") {
					bag.text = `Bag: ${k.data.fuse_held ?? 0}/${c.BAG_CAPACITY}`;
				} else if (depend === "life") {
					life.text = `Life: ${k.data.life ?? 1}`;
				} else if (depend === "god_mode") {
					if (new_data[depend]) {
						k.tween(0.0, 1.0, 1, (s) => {
							god_rect.scaleTo(s);
						});
					} else {
						god_rect.scaleTo(0);
					}
				}
			}
		});
	});

	return ui;
}
