import { clock } from "./items/clock";
import { coffeeMachine } from "./items/coffeeMachine";
import { fridge } from "./items/fridge";

export const items: { [key: string]: Item } = {
	coffeeMachine,
	fridge,
	clock,
};
