import { badInspectResponses } from "../../constants";
import { useGameStore } from "../store";

const useCornetto = () => {
	const {
		inventory,
		addLine,
		gameFlags,
		setFlag,
		removeFromInventory,
		updateInventoryItem,
	} = useGameStore.getState();

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
	const cornettoUsesLeft = (cornetto?.usesLeft || 0) - 1;
	setFlag("cornettosConsumed", cornettosConsumed);
	updateInventoryItem("cornetto", { usesLeft: cornettoUsesLeft });

	if (cornetto && cornettoUsesLeft <= 0) removeFromInventory(cornetto);
};

const useInspectCornetto = () => {
	const { addLine, inventory, currentRoom, gameFlags } =
		useGameStore.getState();

	const isInInventory = inventory.some((i) => i.name === "cornetto");

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

export const cornetto: Item = {
	id: "cornetto",
	name: "cornetto",
	aliases: ["ice cream", "ice-cream", "icecream"],
	describeItem: "A Cornetto. The simplest of frozen consolations.",
	inspectItem: useInspectCornetto,
	use: useCornetto,
	eatable: true,
	usesLeft: 1,
};
