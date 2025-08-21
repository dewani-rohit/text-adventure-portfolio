import {
	badInspectResponses,
	badOpenResponses,
	badUseResponses,
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

	const itemInGame = Object.values(items).some(
		(item) => item.name === target || item.aliases?.includes(target)
	);

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
	const itemInInventory = context.inventory.find(
		(item) => item.name === target || item.aliases?.includes(target)
	);

	const object = itemInRoom || itemInInventory;

	if (!object) {
		const response =
			badInspectResponses[
				Math.floor(Math.random() * badInspectResponses.length)
			];
		context.addLine(response);
		return;
	}

	context.addLine(object.detailedDescription);
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

	const itemInGame = Object.values(items).some(
		(item) => item.name === target || item.aliases?.includes(target)
	);

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

	const isFridgeOpen = context.gameFlags["isFridgeOpen"];
	const cornettosInFridge = context.gameFlags["cornettosInFridge"] as number;

	if (isFridgeOpen) {
		const iceCreamString = `Fridge door was already ajar. ${
			cornettosInFridge === 0
				? "It offers nothing but cold air and existential disappointment."
				: `Inside, ${
						cornettosInFridge === 3
							? "three cornettos await"
							: cornettosInFridge === 2
							? "two cornettos await"
							: "a single cornetto awaits"
				  }.`
		}`;

		context.addLine(iceCreamString);
		return;
	}

	context.setFlag("isFridgeOpen", true);

	const iceCreamString = `You open the fridge. ${
		cornettosInFridge === 0
			? "It offers nothing but cold air and existential disappointment."
			: `A faint chill escapes. Inside, ${
					cornettosInFridge === 3
						? "three cornettos await"
						: cornettosInFridge === 2
						? "two cornettos await"
						: "a single cornetto awaits"
			  }.`
	}`;
	context.addLine(iceCreamString);
};

const handleClose = (target: string, context: GameStore) => {
	if (!target) {
		context.addLine(
			`One could "close" many things, but alas none are specified.`
		);
		return;
	}

	const itemInGame = Object.values(items).some(
		(item) => item.name === target || item.aliases?.includes(target)
	);

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
		"You close the fridge. It resumes its low, self-important hum."
	);
};

const handleUse = (target: string, context: GameStore) => {
	if (!target) {
		context.addLine(
			"Use what? Your imagination? Your degree? Your crippling social anxiety? Please specify."
		);
		return;
	}

	if (target === "room") {
		context.addLine(
			`Ah, yes. You attempt to "use" the room. Congratulations, you are already using it by standing in it.`
		);
		return;
	}

	const itemInGame = Object.values(items).some(
		(item) => item.name === target || item.aliases?.includes(target)
	);

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
	const itemInInventory = context.inventory.find(
		(item) => item.name === target || item.aliases?.includes(target)
	);

	const object = itemInRoom || itemInInventory;

	if (!object) {
		const response =
			badUseResponses(target)[
				Math.floor(Math.random() * badUseResponses(target).length)
			];

		context.addLine(response);
		return;
	}

	object.use();
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
	{
		name: "use",
		aliases: ["u"],
		execute: handleUse,
	},
];
