import { useGameStore } from "../store";
import { emptyCup } from "./emptyCup";

const useCoffee = () => {
	const {
		addLine,
		inventory,
		addToInventory,
		removeFromInventory,
		updateInventoryItem,
	} = useGameStore.getState();

	const coffee = inventory.find((i) => i.id === "coffee");

	if (!coffee) {
		addLine(
			"Drinking coffee generally required possession of said coffee. Radical, I know."
		);
		return;
	}

	const usesLeft = coffee.usesLeft!;

	if (usesLeft === 1) {
		addLine(
			"You savour the final, precious drop, as though it were liquid gold. It lingers for a moment, then vanishes — leaving you with an empty cup and an emptier sense of purpose."
		);
		removeFromInventory(coffee);
		addToInventory(emptyCup);
		return;
	}

	addLine(
		"It's a damn fine cup of coffee, brewed with such care it makes you question every brown liquid you've ever dared to sip before. You particularly enjoy its flavour, which is why your hands are trembling with something that is either delight or the onset of a caffeine-induced existential crisis."
	);

	const newUses = usesLeft - 1;

	updateInventoryItem(coffee.id, { usesLeft: newUses });
};

const useInspectCoffee = () => {
	const { addLine } = useGameStore.getState();
	addLine(
		"You look at the cup you hold. A brew so well executed it makes you question every cup you've tolerated before. Notes of chocolate, citrus, and smug superiority."
	);
};

const useTakeCoffee = () => {
	const { addToInventory, addLine, removeItemFromRoom, currentRoom } =
		useGameStore.getState();

	removeItemFromRoom(coffee, currentRoom);
	addToInventory(coffee);
	addLine(
		"You hold the cup of coffee. Its warmth seeps into your hands, a quiet reminder that sometimes salvation comes in small, caffeinated doses."
	);
};

const useDropCoffee = () => {
	const { removeFromInventory, addLine, moveItemToRoom, currentRoom } =
		useGameStore.getState();

	removeFromInventory(coffee);
	moveItemToRoom(coffee, currentRoom);
	addLine(
		"You set the coffee down. Its promise lingers in the air, quietly insisting that salvation can wait on the table for now."
	);
};

export const coffee: Item = {
	id: "coffee",
	name: "coffee",
	describeItem:
		"There is a damn fine cup of coffee. Black as midnight on a moonless night.",
	inspectItem: useInspectCoffee,
	use: useCoffee,
	usesLeft: 3,
	drinkable: true,
	portable: true,
	take: useTakeCoffee,
	drop: useDropCoffee,
};
