import { useGameStore } from "../store";

const useClock = () => {
	const { addLine } = useGameStore.getState();

	addLine(
		"You try reading the time. The clock is locked at 10:04. Maybe it was struck by lightning?"
	);
};

const useInspectClock = () => {
	const { addLine } = useGameStore.getState();

	addLine(
		"The clock's face is pristine, yet unmoving. Its hands rest stubbornly at 10:04, as though time itself found this moment satisfactory and chose never to leave it."
	);
};

export const clock: Item = {
	id: "clock",
	name: "clock",
	describeItem: "There is a wall clock hanging just above eye level.",
	inspectItem: useInspectClock,
	use: useClock,
	portable: false,
};
