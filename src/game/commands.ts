import { helpResponse } from "../constants";

const handleHelp = (target: string, context: GameStore) => {
	if (target && target !== "me") {
		context.addLine(
			`You have used the command "help" in a way I do not understand.`
		);
		return;
	}

	context.addLine(helpResponse);
};

const handleRestart = (target: string, context: GameStore) => {
	if (target && target !== "game") {
		context.addLine(
			`You have used the command "restart" in a way I do not understand.`
		);
		return;
	}

	context.restartGame();
};

export const commands: CommandDefinition[] = [
	{
		name: "help",
		aliases: ["h", "?"],
		execute: handleHelp,
	},
	{
		name: "restart",
		execute: handleRestart,
	},
];
