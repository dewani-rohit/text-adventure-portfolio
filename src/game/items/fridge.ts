import { getFridgeMessage } from "../../utils";
import { useGameStore } from "../store";

const useFridge = () => {
	const { addLine, gameFlags, setFlag } = useGameStore.getState();

	const cornettosInFridge = gameFlags["cornettosInFridge"] as number;
	const isFridgeOpen = gameFlags["isFridgeOpen"];

	if (isFridgeOpen) {
		addLine("You close the fridge. It resumes its low, self-important hum.");

		setFlag("isFridgeOpen", false);
		return;
	}

	const message = `You open the fridge. ${getFridgeMessage(
		cornettosInFridge,
		true
	)}`;

	addLine(message);

	setFlag("isFridgeOpen", true);
};

const useInspectFridge = () => {
	const { addLine, gameFlags } = useGameStore.getState();

	const isFridgeOpen = gameFlags["isFridgeOpen"];

	if (isFridgeOpen) {
		addLine(
			"The refrigerator stands solid and unassuming, its door swung wide. A faint draft drifts out, the chill air escaping with quiet indifference to your intrusion."
		);
		return;
	}

	addLine(
		"The refrigerator stands solid and unassuming, its handle cool and slightly worn."
	);
	return;
};

export const fridge: Item = {
	id: "fridge",
	name: "fridge",
	describeItem:
		"A modest refrigerator rests against the wall, its smooth surface reflecting the room's faint light.",
	inspectItem: useInspectFridge,
	use: useFridge,
	portable: false,
};
