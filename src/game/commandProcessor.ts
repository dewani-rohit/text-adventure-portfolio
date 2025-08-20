import { blankResponses, unknownResponses } from "../constants";
import { commands } from "./commands";
import { useGameStore } from "./store";

const createCommandMaps = (commands: CommandDefinition[]) => {
	const commandMap = new Map<string, CommandDefinition>();
	const aliasMap = new Map<string, CommandDefinition>();

	commands.forEach((cmd) => {
		commandMap.set(cmd.name.toLowerCase(), cmd);
		cmd.aliases?.forEach((alias) => {
			aliasMap.set(alias.toLowerCase(), cmd);
		});
	});

	return { commandMap, aliasMap };
};

// const createCommandProcessor = () => {

const findCommand = (input: string) => {
	const { commandMap, aliasMap } = createCommandMaps(commands);

	const normalizedInput = input.toLowerCase();

	return (
		commandMap.get(normalizedInput) || aliasMap.get(normalizedInput) || null
	);
};

const parseInput = (input: string) => {
	let normalizedInput = input.trim().toLowerCase();

	normalizedInput = normalizedInput
		.split(" ")
		.filter((word) => !["the", "a", "an"].includes(word))
		.join(" ");

	const [action, ...rest] = normalizedInput.split(" ");
	const target = rest.join(" ");

	return { input, normalizedInput, action, target };
};

export const processCommand = (input: string) => {
	const {
		input: userInput,
		normalizedInput,
		action,
		target,
	} = parseInput(input);
	const context = useGameStore.getState();

	context.addLine(`> ${userInput}`, "player");

	if (!normalizedInput) {
		const response =
			blankResponses[Math.floor(Math.random() * blankResponses.length)];
		context.addLine(response);
		return;
	}

	const command = findCommand(action);

	if (!command) {
		const response =
			unknownResponses[Math.floor(Math.random() * unknownResponses.length)];
		context.addLine(response);
		return;
	}

	command.execute(target, context);
};
// };
