import { binder } from "./items/binder";
import { clock } from "./items/clock";
import { coffee } from "./items/coffee";
import { coffeeMachine } from "./items/coffeeMachine";
import { console } from "./items/console";
import { cornetto } from "./items/cornetto";
import { degrees } from "./items/degrees";
import { emptyCup } from "./items/emptyCup";
import { fridge } from "./items/fridge";
import { cube } from "./items/holographicCube";
import { plaque } from "./items/plaque";
import { portalGun } from "./items/portalGun";
import { rubberDuck } from "./items/rubberDuck";
import { towel } from "./items/towel";

export const items: { [key: string]: Item } = {
	coffeeMachine,
	fridge,
	clock,
	coffee,
	emptyCup,
	cornetto,
	plaque,
	binder,
	degrees,
	towel,
	console,
	rubberDuck,
	cube,
	portalGun,
};
