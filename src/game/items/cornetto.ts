import { badInspectResponses, badTakeResponses } from "../../constants";
import { useGameStore } from "../store";

const useCornetto = () => {
	const { inventory, addLine, gameFlags, setFlag, removeFromInventory } =
		useGameStore.getState();

	if (gameFlags["cornettosConsumed"] === 3) {
		addLine("If you'd left even one uneaten, this might have worked.");
		return;
	}

	const cornetto = inventory.find((i) => i.name === "cornetto");

	if (!cornetto) {
		addLine(
			"Eating the cornetto would require you holding it. Radical, I know."
		);
		return;
	}

	let cornettosConsumed = gameFlags["cornettosConsumed"] as number;

	if (cornettosConsumed === 0) {
		addLine(
			"You unwrap the Cornetto and take a bite. Strawberry sweetness, oddly reassuring in its simplicity. A small comfort, the kind you could cling to in the middle of a zombie attack."
		);
	}

	if (cornettosConsumed === 1) {
		addLine(
			"Another Cornetto. Chocolate this time — dark, rich, and firm. The kind of flavor that insists rules matter, even if no one's following them. You finish it, feeling suspiciously… official."
		);
	}

	if (cornettosConsumed === 2) {
		addLine(
			"The final Cornetto. Mint. Refreshing, unsettling, slightly apocalyptic. You savour it like someone trying to make peace with endings, or maybe just with themselves. Either way, it's the last one."
		);
	}

	cornettosConsumed += 1;
	setFlag("cornettosConsumed", cornettosConsumed);
	removeFromInventory(cornetto);
};

const useInspectCornetto = () => {
	const { addLine, inventory, currentRoom, gameFlags } =
		useGameStore.getState();

	if (gameFlags["cornettosConsumed"] === 3) {
		addLine(
			"There is nothing left to observe, except your own gluttony and lack of restraint."
		);
		return;
	}

	const isInInventory = inventory.some((i) => i.id === "cornetto");

	if (!isInInventory) {
		const isInLobby = currentRoom === "lobby";

		if (!isInLobby) {
			const response =
				badInspectResponses[
					Math.floor(Math.random() * badInspectResponses.length)
				];
			addLine(response);

			return;
		}

		const isFridgeOpen = gameFlags["isFridgeOpen"];

		if (!isFridgeOpen) {
			addLine(
				"You squint at the fridge door, as though sheer force of will might grant you x-ray vision. Alas, the Cornetto remains out of sight."
			);
			return;
		}
	}

	addLine(
		"Cornetto... a fragile alliance of wafer, ice cream, and chocolate tip, holding together out of sheer optimism. Some whisper it doubles as a hangover cure. Others just eat it before it melts."
	);
};

const useTakeCornetto = () => {
	const {
		gameFlags,
		setFlag,
		inventory,
		addLine,
		roomItems,
		currentRoom,
		addToInventory,
		removeItemFromRoom,
	} = useGameStore.getState();

	if (gameFlags["cornettosConsumed"] === 3) {
		addLine(
			"There are no more Cornettos left to take. You make certain of that."
		);
		return;
	}

	const cornettosRemaining = 3 - (gameFlags["cornettosConsumed"] as number);
	const cornettosHolding = inventory.filter((i) => i.id === "cornetto").length;

	if (cornettosRemaining === cornettosHolding) {
		addLine(
			"All the Cornettos left in this world are in your hands. A monopoly both glorious and short-lived."
		);
		return;
	}

	const isInRoom = roomItems[currentRoom].some((i) => i.id === "cornetto");

	if (isInRoom) {
		removeItemFromRoom(cornetto, currentRoom);
		addToInventory(cornetto);
		addLine(
			"Claimed. Cold, sweet, and arguably the highlight of your career so far."
		);
		return;
	}

	if (currentRoom === "lobby") {
		if (!gameFlags["isFridgeOpen"]) {
			addLine(
				"You scan the area. No Cornettos lounging about. Should such a delicacy exist, it would likely keep itself cool elsewhere."
			);
			return;
		}

		const cornettosInFridge = gameFlags["cornettosInFridge"] as number;
		if (cornettosInFridge > 0) {
			setFlag("cornettosInFridge", cornettosInFridge - 1);
			addToInventory(cornetto);
			addLine(
				"Claimed. Cold, sweet, and arguably the highlight of your career so far."
			);
			return;
		}
	}

	const response =
		badTakeResponses("cornetto")[
			Math.floor(Math.random() * badTakeResponses("cornetto").length)
		];
	addLine(response);
};

const useDropCornetto = () => {
	const {
		removeFromInventory,
		addLine,
		moveItemToRoom,
		currentRoom,
		gameFlags,
		setFlag,
	} = useGameStore.getState();

	if (currentRoom === "lobby" && gameFlags["isFridgeOpen"]) {
		removeFromInventory(cornetto);
		setFlag(
			"cornettosInFridge",
			(gameFlags["cornettosInFridge"] as number) + 1
		);
		addLine("You return the Cornetto to its chilly homeland.");
		return;
	}

	removeFromInventory(cornetto);
	moveItemToRoom(cornetto, currentRoom);
	addLine(
		"You set the Cornetto aside. Smart move, leaving frozen dairy at room temperature."
	);
};

export const cornetto: Item = {
	id: "cornetto",
	name: "cornetto",
	aliases: ["ice cream", "ice-cream", "icecream"],
	describeItem: "There is a Cornetto. The simplest of frozen consolations.",
	inspectItem: useInspectCornetto,
	use: useCornetto,
	eatable: true,
	portable: true,
	take: useTakeCornetto,
	drop: useDropCornetto,
};
