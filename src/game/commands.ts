import {
	badInspectResponses,
	badOpenResponses,
	helpResponse,
} from "../constants";
import { generateRoomItemsDescription } from "../utils";
import { items } from "./items";
import { rooms } from "./rooms";

const handleHelp = (target: string, context: GameStore) => {
	if (target && target !== "me") {
		context.addLine("Alas, something about that input escapes comprehension.");
		return;
	}

	context.addLine(helpResponse);
};

const handleRestart = (target: string, context: GameStore) => {
	if (target && target !== "game") {
		context.addLine("Alas, something about that input escapes comprehension.");
		return;
	}

	context.restartGame();
};

const handleLook = (target: string, context: GameStore) => {
	if (target && target !== "around") {
		const [preposition, ...rest] = target.split(" ");
		const objectName = rest.join(" ");

		if (!objectName) {
			let response = "";

			if (preposition === "in")
				response =
					"You take a moment to peer into yourself. The results are inconclusive.";

			if (preposition === "at")
				response =
					"At... what, precisely? A little specificity would be delightful.";

			if (preposition === "out")
				response = "Look out! …Ah. False alarm. Carry on.";

			context.addLine(response);
		} else {
			if (preposition === "at") {
				handleInspect(objectName, context);
				return;
			}

			if (["in", "inside"].includes(preposition)) {
				handleOpen(objectName, context);
				return;
			}
		}

		context.addLine("Alas, something about that input escapes comprehension.");
		return;
	}

	const room = rooms[context.currentRoom];
	const roomDesc = room.detailedDescription;
	const roomItems = context.roomItems[room.id];

	const description = generateRoomItemsDescription(roomDesc, roomItems);

	context.addLine(description);
};

const handleInspect = (target: string, context: GameStore) => {
	if (!target) {
		context.addLine(
			"Inspect what? The void? The meaninglessness of your choices? Specify something tangible, please."
		);
		return;
	}

	if (target === "room") {
		handleLook("", context);
		return;
	}

	const itemInGame = Object.values(items).some((item) => item.name === target);

	if (!itemInGame) {
		let regex = /\s+[a-zA-Z]+\s+\w+/.test(target);
		if (target.split(" ").length >= 2) {
			regex = /\s+([a-zA-Z]+(?:\s+[a-zA-Z]+)*)/.test(target);
		}

		if (regex) {
			context.addLine(
				"Alas, something about that input escapes comprehension."
			);
			return;
		}

		context.addLine(`I do not know what "${target}" is.`);
		return;
	}

	const room = rooms[context.currentRoom];
	const roomItems = context.roomItems[room.id];

	const itemInRoom = roomItems.find((item) => item.name === target);

	if (!itemInRoom) {
		const response =
			badInspectResponses[
				Math.floor(Math.random() * badInspectResponses.length)
			];
		context.addLine(response);
		return;
	}

	context.addLine(itemInRoom.detailedDescription);
};

const handleOpen = (target: string, context: GameStore) => {
	if (!target) {
		context.addLine(
			"Open what? The possibilities are endless... but you need to pick one."
		);

		return;
	}

	if (target === "room") {
		handleLook("", context);
		return;
	}

	const itemInGame = Object.values(items).some((item) => item.name === target);

	if (!itemInGame) {
		let regex = /\s+[a-zA-Z]+\s+\w+/.test(target);
		if (target.split(" ").length >= 2) {
			regex = /\s+([a-zA-Z]+(?:\s+[a-zA-Z]+)*)/.test(target);
		}

		if (regex) {
			context.addLine(
				"Alas, something about that input escapes comprehension."
			);
			return;
		}

		context.addLine(`I do not know what "${target}" is.`);
		return;
	}

	const room = rooms[context.currentRoom];
	const roomItems = context.roomItems[room.id];

	const itemInRoom = roomItems.find((item) => item.name === target);

	if (!itemInRoom) {
		const response =
			badOpenResponses(target)[
				Math.floor(Math.random() * badOpenResponses(target).length)
			];
		context.addLine(response);
		return;
	}

	if (target !== "fridge") {
		context.addLine(
			"Some things are simply surface-level. This is one of them."
		);
		return;
	}

	if (context.gameFlags["isFridgeOpen"]) {
		context.addLine(
			"Fridge door was already ajar. There are 3 delicious cornettos stacked in here."
		);
		return;
	}

	context.setFlag("isFridgeOpen", true);
	context.addLine("You open the fridge. Behold: 3 cornettos.");
};

const handleClose = (target: string, context: GameStore) => {
	if (!target) {
		context.addLine(
			`One could "close" many things, but alas none are specified.`
		);
		return;
	}

	const itemInGame = Object.values(items).some((item) => item.name === target);

	if (!itemInGame) {
		let regex = /\s+[a-zA-Z]+\s+\w+/.test(target);
		if (target.split(" ").length >= 2) {
			regex = /\s+([a-zA-Z]+(?:\s+[a-zA-Z]+)*)/.test(target);
		}

		if (regex) {
			context.addLine(
				"Alas, something about that input escapes comprehension."
			);
			return;
		}

		context.addLine(`I do not know what "${target}" is.`);
		return;
	}

	if (target !== "fridge") {
		context.addLine(
			"You could have closed it... if only it were ever openable."
		);
		return;
	}

	if (!context.gameFlags["isFridgeOpen"]) {
		context.addLine(
			"You attempt to close the fridge. It was already closed. Dramatic flourish noted."
		);
		return;
	}

	context.setFlag("isFridgeOpen", false);
	context.addLine(
		"The fridge door clicks shut, enclosing its precious cornettos like tiny, frozen treasures."
	);
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
	{
		name: "inspect",
		aliases: ["examine", "x"],
		execute: handleInspect,
	},
	{
		name: "open",
		execute: handleOpen,
	},
	{
		name: "close",
		execute: handleClose,
	},
];
