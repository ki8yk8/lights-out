import { rem } from "../helpers/utils";

export function Hints({ k, c }) {
	return [k.rect(rem(2), rem(2)), k.area(), k.color("#b8b8b8"), "hints"];
}
