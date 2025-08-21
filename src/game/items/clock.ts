import { useGameStore } from "../store";

const useClock = () => {
	const { addLine } = useGameStore.getState();

	addLine(
		"You try reading the time. The clock is locked at 10:04. Maybe it was struck by lightning?"
	);
};

export const clock: Item = {
	id: "clock",
	name: "clock",
	briefDescription: "There is a wall clock hanging just above eye level.",
	detailedDescription:
		"The clock's face is pristine, yet unmoving. Its hands rest stubbornly at 10:04, as though time itself found this moment satisfactory and chose never to leave it.",
	use: useClock,
};
