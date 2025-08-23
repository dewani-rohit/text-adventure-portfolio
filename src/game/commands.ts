import {
	badDropResponses,
	badInspectResponses,
	badOpenResponses,
	badTakeResponses,
	badUseResponses,
	emptyInventoryResponses,
	helpResponse,
	inventoryFullResponses,
	notPortableResponses,
} from "../constants";
import {
	canAccessCornetto,
	findItem,
	generateRoomItemsDescription,
	getFridgeMessage,
	validateItemExists,
	validateTarget,
} from "../utils";
import { rooms } from "./rooms";

const handleHelp = (target: string, context: GameStore) => {
	const error = validateTarget(target, "me");
	if (error) {
		context.addLine(error);
		return;
	}
	context.addLine(helpResponse);
};

const handleRestart = (target: string, context: GameStore) => {
	const error = validateTarget(target, "game");
	if (error) {
		context.addLine(error);
		return;
	}
	context.restartGame();
};

const handleLook = (target: string, context: GameStore) => {
	if (target && target !== "around") {
		const [preposition, ...rest] = target.split(" ");
		const objectName = rest.join(" ");

		if (!objectName) {
			const responses: Record<string, string> = {
				in: "You take a moment to peer into yourself. The results are inconclusive.",
				at: "At... what, precisely? A little specificity would be delightful.",
				out: "Look out! False alarm. Carry on.",
			};

			const response = responses[preposition] || "";
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
	const roomDesc = `${room.detailedDescription} ${room.exitDescription}`;
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

	const error = validateItemExists(target);
	if (error) {
		context.addLine(error);
		return;
	}

	const object = findItem(target, context);
	if (!object) {
		const response =
			badInspectResponses[
				Math.floor(Math.random() * badInspectResponses.length)
			];
		context.addLine(response);
		return;
	}

	object.inspectItem();
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

	const error = validateItemExists(target);
	if (error) {
		context.addLine(error);
		return;
	}

	const object = findItem(target, context);
	const isCornettoAround = canAccessCornetto(context);

	if (!object || (object.id === "cornetto" && !isCornettoAround)) {
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
		const message = `Fridge door was already ajar. ${getFridgeMessage(
			cornettosInFridge
		)}`;
		context.addLine(message);
		return;
	}

	context.setFlag("isFridgeOpen", true);
	const message = `You open the fridge. ${getFridgeMessage(
		cornettosInFridge,
		true
	)}`;
	context.addLine(message);
};

const handleClose = (target: string, context: GameStore) => {
	if (!target) {
		context.addLine(
			`One could "close" many things, but alas none are specified.`
		);
		return;
	}

	const error = validateItemExists(target);
	if (error) {
		context.addLine(error);
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

	const error = validateItemExists(target);
	if (error) {
		context.addLine(error);
		return;
	}

	const object = findItem(target, context);
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

const handleTake = (target: string, context: GameStore) => {
	if (!target) {
		context.addLine(`How about you "take" a moment to specify what you want?`);
		return;
	}

	if (target === "room") {
		context.addLine(
			"That's not how rooms work. They tend to be the ones doing the holding."
		);
		return;
	}

	const error = validateItemExists(target);
	if (error) {
		context.addLine(error);
		return;
	}

	const alreadyHolding = context.inventory.find((i) =>
		[i.name, ...(i.aliases || [])].includes(target)
	);
	if (alreadyHolding && alreadyHolding.id !== "cornetto") {
		context.addLine(
			`Your grasp tightens on ${target}, which you already hold. A triumph of redundancy.`
		);
		return;
	}

	const object = findItem(target, context);
	if (!object) {
		const response =
			badTakeResponses(target)[
				Math.floor(Math.random() * badTakeResponses(target).length)
			];
		context.addLine(response);
		return;
	}

	if (!object.portable || !object.take) {
		const response =
			notPortableResponses[
				Math.floor(Math.random() * notPortableResponses.length)
			];
		context.addLine(response);
		return;
	}

	if (context.inventory.length === 5) {
		const response =
			inventoryFullResponses[
				Math.floor(Math.random() * inventoryFullResponses.length)
			];
		context.addLine(response);
		return;
	}

	object.take();
};

const handleDrop = (target: string, context: GameStore) => {
	if (!target) {
		context.addLine(
			"You'll need to clarify what exactly is being let go of. Existential baggage doesn't count."
		);
		return;
	}

	if (target === "room") {
		context.addLine(
			"That's not how rooms work. They tend to be the ones doing the holding."
		);
		return;
	}

	const error = validateItemExists(target);
	if (error) {
		context.addLine(error);
		return;
	}

	const object = context.inventory.find((i) =>
		[i.name, ...(i.aliases || [])].includes(target)
	);
	if (!object || !object.portable || !object.drop) {
		const responses =
			badDropResponses[Math.floor(Math.random() * badDropResponses.length)];
		context.addLine(responses);
		return;
	}

	object.drop();
};

const handleShowInventory = (target: string, context: GameStore) => {
	const error = validateTarget(target);
	if (error) {
		context.addLine(error);
		return;
	}

	if (context.inventory.length === 0) {
		const response =
			emptyInventoryResponses[
				Math.floor(Math.random() * emptyInventoryResponses.length)
			];
		context.addLine(response);
		return;
	}

	let response = `You are currently holding [${context.inventory.length}/5]:\n`;
	const inventorySet = new Set(context.inventory);
	inventorySet.forEach((i) => {
		const count = context.inventory.filter((item) => item.id === i.id).length;
		response += `• ${i.name[0].toUpperCase() + i.name.slice(1)} — ${count}\n  ${
			i.describeItem
		}\n`;
	});
	context.addLine(response);
};

const handleConsume = (target: string, context: GameStore) => {
	if (!target) {
		context.addLine(
			"An admirable instinct, but you'll need an object to devour, not just the concept of gluttony."
		);
		return;
	}

	if (target === "room") {
		context.addLine(
			"Chewing drywall is not a recognized dietary choice, no matter how committed you look."
		);
		return;
	}

	const error = validateItemExists(target);
	if (error) {
		context.addLine(error);
		return;
	}

	const object = findItem(target, context);
	if (!object) {
		const response =
			badTakeResponses(target)[
				Math.floor(Math.random() * badTakeResponses(target).length)
			];
		context.addLine(response);
		return;
	}

	if (!object.eatable && !object.drinkable) {
		context.addLine(
			"Not everything in reach is a snack, despite your enthusiasm."
		);
		return;
	}

	object.use();
};

const handleEat = (target: string, context: GameStore) => {
	if (!target) {
		context.addLine("Hunger is clear, intent is not.");
		return;
	}

	const object = findItem(target, context);
	if (object && object.drinkable && !object.eatable) {
		context.addLine(
			"Yes, because gnawing on liquid has always worked out great for everyone involved."
		);
		return;
	}

	handleConsume(target, context);
};

const handleDrink = (target: string, context: GameStore) => {
	if (!target) {
		context.addLine(
			"Refreshing! If only there had been an actual beverage involved."
		);
		return;
	}

	if (target === "room") {
		context.addLine(
			"Unless the room has been juiced lately, nothing's going to happen."
		);
		return;
	}

	const object = findItem(target, context);
	if (object && !object.drinkable && object.eatable) {
		context.addLine("Not everything in the world is conveniently liquid.");
		return;
	}

	handleConsume(target, context);
};

const handleGo = (target: string, context: GameStore) => {
	if (!target) {
		context.addLine(
			"Go where? Forward in life? Back to bed? You'll need to be slightly more specific."
		);
		return;
	}

	if (target === "to hell") {
		context.addLine("Haven't you figured out you're already in the Bad Place?");
		return;
	}

	if (target === "back") {
		if (!context.previousRoom) {
			context.addLine("There's no going back.");
			return;
		}

		context.setCurrentRoom(context.previousRoom);
		return;
	}

	const currentRoomExits = rooms[context.currentRoom].exits;
	const [preposition, ...rest] = target.split(" ");
	const destination = rest.join(" ");

	if (["in", "to"].includes(preposition)) {
		if (["lobby", "office", "study", "lab"].includes(destination)) {
			if (context.currentRoom === destination) {
				context.addLine(
					"You stand in place, accomplishing nothing. A masterclass in futility."
				);
				return;
			}
			const exitExists = Object.values(currentRoomExits).includes(destination);

			if (!exitExists) {
				context.addLine(
					"You can't go through walls. You're not a ghost... or fire."
				);
				return;
			}

			if (
				context.currentRoom === "lobby" &&
				context.gameFlags["isFridgeOpen"]
			) {
				context.addLine("Ahem… the fridge. Still open.");
				return;
			}

			context.setCurrentRoom(destination);
			return;
		}
	}

	if (["n", "e", "w", "s", "north", "east", "west", "south"].includes(target)) {
		let getRoom;

		if (["n", "north"].includes(target)) {
			getRoom = currentRoomExits["north"];
		}

		if (["e", "east"].includes(target)) {
			getRoom = currentRoomExits["east"];
		}

		if (["w", "west"].includes(target)) {
			getRoom = currentRoomExits["west"];
		}

		if (["s", "south"].includes(target)) {
			getRoom = currentRoomExits["south"];
		}

		if (!getRoom) {
			context.addLine(
				"Forward momentum meets solid object. Guess which one yields? (Hint: not the object.)"
			);
			return;
		}

		if (getRoom) {
			context.setCurrentRoom(getRoom);
			return;
		}
	}

	context.addLine(
		`You can't just type words after "go" and expect magic. This isn't improv theatre.`
	);
};

const handleGoBack = (target: string, context: GameStore) => {
	const error = validateTarget(target);
	if (error) {
		context.addLine(error);
		return;
	}

	handleGo("back", context);
};

const handleGoNorth = (target: string, context: GameStore) => {
	const error = validateTarget(target);
	if (error) {
		context.addLine(error);
		return;
	}

	handleGo("north", context);
};

const handleGoEast = (target: string, context: GameStore) => {
	const error = validateTarget(target);
	if (error) {
		context.addLine(error);
		return;
	}

	handleGo("east", context);
};

const handleGoWest = (target: string, context: GameStore) => {
	const error = validateTarget(target);
	if (error) {
		context.addLine(error);
		return;
	}

	handleGo("west", context);
};

const handleGoSouth = (target: string, context: GameStore) => {
	const error = validateTarget(target);
	if (error) {
		context.addLine(error);
		return;
	}

	handleGo("south", context);
};

const handleExit = (target: string, context: GameStore) => {
	const error = validateTarget(target, "room");
	if (error) {
		context.addLine(error);
		return;
	}

	const currentRoomExits = rooms[context.currentRoom].exits;
	if (Object.entries(currentRoomExits).length > 1) {
		context.addLine("So many ways out, so little clarity. Care to pick one?");
		return;
	}

	const exit = Object.keys(currentRoomExits)[0];
	handleGo(exit, context);
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
	{
		name: "take",
		aliases: ["pick", "pick up", "grab", "hold", "possess", "acquire"],
		execute: handleTake,
	},
	{
		name: "drop",
		aliases: ["discard", "leave", "remove", "release"],
		execute: handleDrop,
	},
	{
		name: "inventory",
		aliases: ["i", "bag"],
		execute: handleShowInventory,
	},
	{
		name: "consume",
		execute: handleConsume,
	},
	{
		name: "eat",
		execute: handleEat,
	},
	{
		name: "drink",
		aliases: ["sip", "slurp"],
		execute: handleDrink,
	},
	{
		name: "go",
		aliases: ["walk", "move"],
		execute: handleGo,
	},
	{
		name: "north",
		aliases: ["n"],
		execute: handleGoNorth,
	},
	{
		name: "east",
		aliases: ["e"],
		execute: handleGoEast,
	},
	{
		name: "west",
		aliases: ["w"],
		execute: handleGoWest,
	},
	{
		name: "south",
		aliases: ["s"],
		execute: handleGoSouth,
	},
	{
		name: "back",
		execute: handleGoBack,
	},
	{
		name: "exit",
		execute: handleExit,
	},
];
