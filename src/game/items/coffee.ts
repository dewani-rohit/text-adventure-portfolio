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

	const coffee = inventory.find((i) => i.name === "coffee");

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

export const coffee: Item = {
	id: "coffee",
	name: "coffee",
	briefDescription:
		"There is a damn fine cup of coffee. Black as midnight on a moonless night.",
	detailedDescription:
		"You look at the cup you hold. A brew so well executed it makes you question every cup you've tolerated before. Notes of chocolate, citrus, and smug superiority.",
	use: useCoffee,
	usesLeft: 3,
	drinkable: true,
};
