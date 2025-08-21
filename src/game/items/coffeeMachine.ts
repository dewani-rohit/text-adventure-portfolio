import { useGameStore } from "../store";
import { coffee } from "./coffee";
import { emptyCup } from "./emptyCup";

const useCoffeeMachine = () => {
	const { addLine, inventory, removeFromInventory, addToInventory } =
		useGameStore.getState();

	const hasCoffee = inventory.some((item) => item.name === "coffee");

	if (hasCoffee) {
		addLine(
			"Ah, doubling down on caffeine? Admirable. Unfortunately, you can only juggle one volatile cup of steaming liquid at a time."
		);
		return;
	}

	const hasEmptyCup = inventory.some((item) => item.name === "empty cup");

	if (!hasEmptyCup) {
		addLine(
			"What a perfect brew this machine might have produced… if only destiny had provided you with a vessel."
		);
		return;
	}

	removeFromInventory(emptyCup);
	addToInventory(coffee);

	addLine(
		"With a gurgle, a hiss, and something suspiciously like a sigh, the machine delivers. Behold! What was once an empty vessel of potential now brims with jittery ambition in liquid form."
	);
};

const useInspectCoffeeMachine = () => {
	const { addLine } = useGameStore.getState();
	addLine(
		"A sleek chrome coffee machine stands in the corner, its surface warm to the touch. The steady hum suggests it is ready to brew at a moment's notice."
	);
};

export const coffeeMachine: Item = {
	id: "coffeeMachine",
	name: "coffee machine",
	describeItem:
		"There is a small coffee machine humming quietly in the corner, polished chrome gleaming in the soft light.",
	inspectItem: useInspectCoffeeMachine,
	use: useCoffeeMachine,
};
