import kaplay from "kaplay";
import { registerMapScene } from "./scenes/map";

const k = kaplay({ global: false });

k.loadRoot("./"); // A good idea for Itch.io publishing later

registerMapScene({ k, name: "map" });

k.go("map");
