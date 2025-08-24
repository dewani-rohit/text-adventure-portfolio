import { useGameStore } from "../store";

const useInspectDegrees = () => {
	const { addLine } = useGameStore.getState();
	addLine(`Upon closer inspection, the frames display:

  • M.Sc. Computer Science (2020 - 2022)
    St. Joseph's College (Autonomous), Bengaluru

  • B.Sc. Computer Science (2016 - 2019)
    K. K. Wagh College of Arts, Commerce, Science, & Computer Science, Nashik
  
Ah yes, thousands of hours of sleepless nights and caffeine dependency, all distilled into... wall décor.`);
};

const useDegrees = () => {
	const { addLine } = useGameStore.getState();
	addLine(
		"Use it? I tried that too. Turns out recruiters prefer three years of experience in a tool invented last Tuesday."
	);
};

export const degrees: Item = {
	id: "degrees",
	name: "degrees",
	aliases: ["degree", "certificate", "certificates"],
	roomMention:
		"A series of framed degrees adorns the wall, solemnly testifying to academic endurance.",
	inspectItem: useInspectDegrees,
	use: useDegrees,
	portable: false,
};
