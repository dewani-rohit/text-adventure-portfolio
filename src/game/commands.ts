import { helpResponse } from "../constants";
import { generateRoomItemsDescription } from "../utils";
import { rooms } from "./rooms";

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

const handleLook = (target: string, context: GameStore) => {
	if (target && target !== "around") {
		context.addLine(
			`You have used the command "look" in a way I do not understand.`
		);
		return;
	}

	const room = rooms[context.currentRoom];
	const roomDesc = room.detailedDescription;
	const roomItems = context.roomItems[room.id];

	const description = generateRoomItemsDescription(roomDesc, roomItems);

	context.addLine(description);
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
	{
		name: "look",
		aliases: ["l"],
		execute: handleLook,
	},
];
