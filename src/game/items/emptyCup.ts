import { useGameStore } from "../store";

const useCup = () => {
	const { addLine, inventory } = useGameStore.getState();

	const isHoldingCup = inventory.some((i) => i.id === "emptyCup");

	if (!isHoldingCup) {
		addLine("You'd need to hold it first.");
		return;
	}

	addLine(
		"You tip the mug to your lips, but nothing greets you — only the hollow weight of cold porcelain."
	);
};

const useInspectCup = () => {
	const { addLine } = useGameStore.getState();
	addLine(
		"You look into the cup. No warmth, no aroma, just vacant porcelain. Coffee as absent as the moon on a moonless night."
	);
};

const useTakeCup = () => {
	const { addToInventory, addLine, removeItemFromRoom, currentRoom } =
		useGameStore.getState();

	removeItemFromRoom(emptyCup, currentRoom);
	addToInventory(emptyCup);
	addLine(
		"You now have a cup. Empty for now, awaiting to be filled with joy and jitter."
	);
};

const useDropCup = () => {
	const { removeFromInventory, addLine, moveItemToRoom, currentRoom } =
		useGameStore.getState();

	removeFromInventory(emptyCup);
	moveItemToRoom(emptyCup, currentRoom);
	addLine("You place the cup down. Still empty, still waiting.");
};

export const emptyCup: Item = {
	id: "emptyCup",
	name: "empty cup",
	aliases: ["cup"],
	roomMention: "There is also an empty cup.",
	describeItem: "An empty cup — a vessel yearning for purpose.",
	inspectItem: useInspectCup,
	use: useCup,
	portable: true,
	take: useTakeCup,
	drop: useDropCup,
};
