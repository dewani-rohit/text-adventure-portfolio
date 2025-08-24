import { useGameStore } from "../store";

const useInspectTowel = () => {
	const { addLine } = useGameStore.getState();
	addLine(
		"It's just a towel. Soft, frayed at the edges, smelling faintly of detergent and travel. Strangely, holding it instills a misplaced sense of preparedness, as though you could handle interstellar bureaucracy or a sudden existential crisis at a moment's notice."
	);
};

const useTowel = () => {
	const { addLine, inventory } = useGameStore.getState();

	const hasTowel = inventory.some((i) => i.id === "towel");
	if (!hasTowel) {
		addLine(
			"You reach for your towel, only to discover you've not packed one. Rookie mistake."
		);
		return;
	}

	addLine(
		"You wrap the towel around your shoulders, clutch it in your hands, and generally attempt to look like someone who has a plan. Surprisingly, you almost pull it off. Almost."
	);
};

const useTakeTowel = () => {
	const { addLine, addToInventory, removeItemFromRoom, currentRoom } =
		useGameStore.getState();

	removeItemFromRoom(towel, currentRoom);
	addToInventory(towel);
	addLine(
		"You take the towel. Congratulations — you are now officially 42% more prepared for whatever nonsense awaits."
	);
};

const useDropTowel = () => {
	const { removeFromInventory, addLine, moveItemToRoom, currentRoom } =
		useGameStore.getState();

	removeFromInventory(towel);
	moveItemToRoom(towel, currentRoom);
	addLine(
		"The towel flops to the floor, awaiting the next poor soul who underestimates its importance."
	);
};

export const towel: Item = {
	id: "towel",
	name: "towel",
	roomMention:
		"Folded neatly, a towel rests nearby — unremarkable, but oddly reassuring.",
	describeItem: "A slightly worn, thoroughly ordinary-looking towel.",
	inspectItem: useInspectTowel,
	use: useTowel,
	portable: true,
	take: useTakeTowel,
	drop: useDropTowel,
};
