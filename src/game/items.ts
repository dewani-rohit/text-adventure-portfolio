import { clock } from "./items/clock";
import { coffee } from "./items/coffee";
import { coffeeMachine } from "./items/coffeeMachine";
import { cornetto } from "./items/cornetto";
import { emptyCup } from "./items/emptyCup";
import { fridge } from "./items/fridge";

export const items: { [key: string]: Item } = {
	coffeeMachine,
	fridge,
	clock,
	coffee,
	emptyCup,
	cornetto,
};
