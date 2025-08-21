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

	const iceCreamString = `You open the fridge. ${
		cornettosInFridge === 0
			? "It offers nothing but cold air and existential disappointment."
			: `A faint chill escapes. Inside, ${
					cornettosInFridge === 3
						? "three cornettos await"
						: cornettosInFridge === 2
						? "two cornettos await"
						: "a single cornetto awaits"
			  }.`
	}`;

	addLine(iceCreamString);

	setFlag("isFridgeOpen", true);
};

export const fridge: Item = {
	id: "fridge",
	name: "fridge",
	// TODO: change desc of fridge depending on open status
	briefDescription:
		"A modest refrigerator rests against the wall, its smooth surface reflecting the room's faint light.",
	detailedDescription:
		"The refrigerator stands solid and unassuming, its handle cool and slightly worn. A faint draft escapes when you tug the seal, carrying with it the quiet promise of whatever lies inside.",
	use: useFridge,
};
