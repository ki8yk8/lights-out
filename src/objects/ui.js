import { doubleDigit } from "../helpers/utils";

export function UI({ k, c, level }) {
	// this is fixed and not affected by the camera movement
	const ui = k.add([k.fixed(), k.layer("ui"), "ui"]);
	let prev_data = { ...k.data };

	// time elpased
	const timer = ui.add([
		k.text(`Time Left: 10:00`, {
			size: 24,
		}),
		k.pos(0, 0),
		k.color("#000000"),
		k.timer(),
		"timer",
		{
			t: k.data.time,
		},
	]);

	// will implement this later because this may not be necessary at all.
	let timer_loop = timer.loop(1, () => {
		timer.t.s--;
		if (timer.t.s < 0 && timer.t.m === 0) {
			k.go("gameover", level);
			timer_loop.cancel();
		}

		if (timer.t.s < 0 && timer.t.m > 0) {
			timer.t.s = 59;
			timer.t.m--;
		}

		timer.text = `Time Left: ${doubleDigit(timer.t.m)}:${doubleDigit(
			timer.t.s
		)}`;
	});

	// life
	const life = ui.add([
		k.text(`Life: ${k.data.life ?? 1}`, {
			size: 24,
		}),
		k.pos(k.width(), 0),
		k.anchor("topright"),
		k.color("#000000"),
		"life",
	]);

	// bag capacity
	const bag = ui.add([
		k.text(`Bag: ${k.data.fuse_held ?? 0}/${c.BAG_CAPACITY}`, {
			size: 24,
		}),
		k.pos(k.width(), life.pos.y + life.height + 6),
		k.color("#000000"),
		k.anchor("topright"),
		"bag",
	]);

	k.onUpdate(() => {
		const new_data = k.data;

		// dependency keys
		const DEPENDS = ["fuse_held", "life"];
		DEPENDS.forEach((depend) => {
			if (new_data[depend] !== prev_data[depend]) {
				prev_data = { ...prev_data, [depend]: new_data[depend] };

				if (depend === "fuse_held") {
					bag.text = `Bag: ${k.data.fuse_held ?? 0}/${c.BAG_CAPACITY}`;
				} else if (depend === "life") {
					life.text = `Life: ${k.data.life ?? 1}`;
				}
			}
		});
	});

	return ui;
}
