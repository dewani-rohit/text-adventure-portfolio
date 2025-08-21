import { useGameStore } from "../store";

const useCup = () => {
	const { addLine } = useGameStore.getState();

	addLine(
		"You tip the mug to your lips, but nothing greets you — only the hollow weight of cold porcelain."
	);
};

export const emptyCup: Item = {
	id: "emptyCup",
	name: "empty cup",
	aliases: ["cup"],
	briefDescription: "An empty cup — a vessel yearning for purpose.",
	detailedDescription:
		"You look into the cup. No warmth, no aroma, just vacant porcelain. Coffee as absent as the moon on a moonless night.",
	use: useCup,
};
