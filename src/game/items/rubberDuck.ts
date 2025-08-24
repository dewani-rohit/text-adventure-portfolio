import { useGameStore } from "../store";

const useInspectDuck = () => {
	const { addLine } = useGameStore.getState();
	addLine(
		"A classic debugging companion. Speak your code woes aloud, and though it offers no answers, clarity often emerges. Mysteriously effective, suspiciously silent."
	);
};

const useDuck = () => {
	const { addLine } = useGameStore.getState();
	addLine(
		"You launch into a rambling monologue about your problems. The duck doesn't interrupt, doesn't judge, doesn't even blink. By the time you stop, the answer has magically appeared in your head."
	);
};

const useTakeDuck = () => {
	const { addToInventory, addLine, removeItemFromRoom, currentRoom } =
		useGameStore.getState();

	removeItemFromRoom(rubberDuck, currentRoom);
	addToInventory(rubberDuck);
	addLine(
		"You carefully pick up the rubber duck. Its blank expression radiates infinite patience, as if it's been waiting for you all along."
	);
};

const useDropDuck = () => {
	const { removeFromInventory, addLine, moveItemToRoom, currentRoom } =
		useGameStore.getState();

	removeFromInventory(rubberDuck);
	moveItemToRoom(rubberDuck, currentRoom);
	addLine(
		"You gently place the duck down. It resumes its post, ever watchful, ever mute."
	);
};

export const rubberDuck: Item = {
	id: "rubberDuck",
	name: "rubber duck",
	aliases: ["duck"],
	roomMention: "A rubber duck perches serenely on a counter.",
	describeItem: "A trusty rubber duck.",
	inspectItem: useInspectDuck,
	use: useDuck,
	portable: true,
	take: useTakeDuck,
	drop: useDropDuck,
};
