import { useGameStore } from "../store";

const contactData = () => {
	const { addLine } = useGameStore.getState();
	addLine(`
			Rohit Dewani`);
	addLine(
		"email: rohit.jd23@gmail.com",
		"system-link",
		"mailto:rohit.jd23@gmail.com"
	);
	addLine(
		"linkedin profile",
		"system-link",
		"https://www.linkedin.com/in/rohitdewani/"
	);
	addLine("github", "system-link", "https://github.com/dewani-rohit/");
};

const useCube = () => {
	const { addLine } = useGameStore.getState();

	addLine(`You touch the cube and the lights flare briefly.
`);
	contactData();
	addLine(`
Hire, contact, or collaborate with him — or not. The cube doesn't judge and neither do I.
`);
};

const useInspectCube = () => {
	const { addLine } = useGameStore.getState();

	addLine(`You approach the cube. Its lights pulse as if eager to reveal something… very important.
`);
	contactData();
	addLine(`
The cube hums. That's everything you need to reach out… if you're feeling ambitious.
`);
};

export const cube: Item = {
	id: "cube",
	name: "holographic cube",
	aliases: ["cube"],
	roomMention:
		"A faintly glowing holographic cube hovers in the corner, projecting shifting patterns of light.",
	inspectItem: useInspectCube,
	use: useCube,
	portable: false,
};
