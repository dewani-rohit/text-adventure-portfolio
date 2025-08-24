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
	createLookResponses,
	findItem,
	generateInventoryDisplay,
	generateRoomItemsDescription,
	getFridgeMessage,
	getRandomResponse,
	validateCommand,
} from "../utils";
import { rooms } from "./rooms";

const handleHelp = (target: string, context: GameStore) => {
	if (validateCommand(target, context, { expectedTarget: "me" })) return;
	context.addLine(helpResponse);
};

const handleRestart = (target: string, context: GameStore) => {
	if (validateCommand(target, context, { expectedTarget: "game" })) return;
	context.restartGame();
};

const handleLook = (target: string, context: GameStore) => {
	if (target && target !== "around") {
		const [preposition, ...rest] = target.split(" ");
		const objectName = rest.join(" ");

		if (!objectName) {
			const responses = createLookResponses();
			context.addLine(responses[preposition as keyof typeof responses] || "");
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
	if (
		validateCommand(target, context, {
			noTargetMessage:
				"Inspect what? The void? The meaninglessness of your choices? Specify something tangible, please.",
			needsItem: true,
			allowRoom: true,
		})
	)
		return;

	if (target === "room") {
		handleLook("", context);
		return;
	}

	const object = findItem(target, context);
	if (!object) {
		context.addLine(getRandomResponse(badInspectResponses)());
		return;
	}

	object.inspectItem();
};

const handleOpen = (target: string, context: GameStore) => {
	if (
		validateCommand(target, context, {
			noTargetMessage:
				"Open what? The possibilities are endless... but you need to pick one.",
			needsItem: true,
			allowRoom: true,
		})
	)
		return;

	if (target === "room") {
		handleLook("", context);
		return;
	}

	const object = findItem(target, context);
	const isCornettoAround = canAccessCornetto(context);

	if (!object || (object.id === "cornetto" && !isCornettoAround)) {
		context.addLine(getRandomResponse(badOpenResponses)(target));
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

	const message = isFridgeOpen
		? `Fridge door was already ajar. ${getFridgeMessage(cornettosInFridge)}`
		: `You open the fridge. ${getFridgeMessage(cornettosInFridge, true)}`;

	if (!isFridgeOpen) {
		context.setFlag("isFridgeOpen", true);
	}

	context.addLine(message);
};

const handleClose = (target: string, context: GameStore) => {
	if (
		validateCommand(target, context, {
			noTargetMessage: `One could "close" many things, but alas none are specified.`,
			needsItem: true,
			roomMessage: "You could have closed it... if only it were ever openable.",
		})
	)
		return;

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
	if (
		validateCommand(target, context, {
			noTargetMessage:
				"Use what? Your imagination? Your degree? Your crippling social anxiety? Please specify.",
			needsItem: true,
			roomMessage: `Ah, yes. You attempt to "use" the room. Congratulations, you are already using it by standing in it.`,
		})
	)
		return;

	const object = findItem(target, context);
	if (!object) {
		context.addLine(getRandomResponse(badUseResponses)(target));
		return;
	}

	object.use();
};

const handleTake = (target: string, context: GameStore) => {
	if (
		validateCommand(target, context, {
			noTargetMessage: `How about you "take" a moment to specify what you want?`,
			needsItem: true,
		})
	)
		return;

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
		context.addLine(getRandomResponse(badTakeResponses)(target));
		return;
	}

	if (!object.portable || !object.take) {
		context.addLine(getRandomResponse(notPortableResponses)());
		return;
	}

	if (context.inventory.length === 5) {
		context.addLine(getRandomResponse(inventoryFullResponses)());
		return;
	}

	object.take();
};

const handleDrop = (target: string, context: GameStore) => {
	if (
		validateCommand(target, context, {
			noTargetMessage:
				"You'll need to clarify what exactly is being let go of. Existential baggage doesn't count.",
			needsItem: true,
		})
	)
		return;

	const object = context.inventory.find((i) =>
		[i.name, ...(i.aliases || [])].includes(target)
	);
	if (!object || !object.portable || !object.drop) {
		context.addLine(getRandomResponse(badDropResponses)());
		return;
	}

	object.drop();
};

const handleShowInventory = (target: string, context: GameStore) => {
	if (validateCommand(target, context, {})) return;

	if (context.inventory.length === 0) {
		context.addLine(getRandomResponse(emptyInventoryResponses)());
		return;
	}

	context.addLine(generateInventoryDisplay(context.inventory));
};

const handleConsume = (target: string, context: GameStore) => {
	if (
		validateCommand(target, context, {
			noTargetMessage:
				"An admirable instinct, but you'll need an object to devour, not just the concept of gluttony.",
			needsItem: true,
			roomMessage:
				"Chewing drywall is not a recognized dietary choice, no matter how committed you look.",
		})
	)
		return;

	const object = findItem(target, context);
	if (!object) {
		context.addLine(getRandomResponse(badTakeResponses)(target));
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
	if (
		validateCommand(target, context, {
			noTargetMessage: "Hunger is clear, intent is not.",
			needsItem: true,
		})
	)
		return;

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
	if (
		validateCommand(target, context, {
			noTargetMessage:
				"Refreshing! If only there had been an actual beverage involved.",
			needsItem: true,
			roomMessage:
				"Unless the room has been juiced lately, nothing's going to happen.",
		})
	)
		return;

	const object = findItem(target, context);
	if (object && !object.drinkable && object.eatable) {
		context.addLine("Not everything in the world is conveniently liquid.");
		return;
	}

	handleConsume(target, context);
};

export const handleGo = (target: string, context: GameStore) => {
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
			const hasPortalGun = context.inventory.some((i) => i.id === "portalGun");
			if (exitExists || hasPortalGun) {
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

			context.addLine(
				"You can't go through walls. You're not a ghost... or fire."
			);
			return;
		}
	}

	const directionMap: Record<string, string> = {
		n: "north",
		north: "north",
		e: "east",
		east: "east",
		w: "west",
		west: "west",
		s: "south",
		south: "south",
	};

	const direction = directionMap[target];
	if (direction) {
		const getRoom = currentRoomExits[direction];
		if (!getRoom) {
			context.addLine("That way leads… absolutely nowhere.");
			return;
		}
		context.setCurrentRoom(getRoom);
		return;
	}

	context.addLine(
		`You can't just type words after "go" and expect magic. This isn't improv theatre.`
	);
};

export const createDirectionalHandler =
	(direction: string) => (target: string, context: GameStore) => {
		if (target) {
			context.addLine(
				"Alas, something about that input escapes comprehension."
			);
			return;
		}
		handleGo(direction, context);
	};

const handleGoBack = (target: string, context: GameStore) => {
	if (validateCommand(target, context, {})) return;
	handleGo("back", context);
};

const handleExit = (target: string, context: GameStore) => {
	if (validateCommand(target, context, { expectedTarget: "room" })) return;

	const currentRoomExits = rooms[context.currentRoom].exits;
	if (Object.entries(currentRoomExits).length > 1) {
		context.addLine("So many ways out, so little clarity. Care to pick one?");
		return;
	}

	const exit = Object.keys(currentRoomExits)[0];
	handleGo(exit, context);
};

export const commands: CommandDefinition[] = [
	{ name: "help", aliases: ["h", "?"], execute: handleHelp },
	{ name: "restart", execute: handleRestart },
	{ name: "look", aliases: ["l"], execute: handleLook },
	{ name: "inspect", aliases: ["examine", "x"], execute: handleInspect },
	{ name: "open", execute: handleOpen },
	{ name: "close", execute: handleClose },
	{ name: "use", aliases: ["u"], execute: handleUse },
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
	{ name: "inventory", aliases: ["i", "bag"], execute: handleShowInventory },
	{ name: "consume", execute: handleConsume },
	{ name: "eat", execute: handleEat },
	{ name: "drink", aliases: ["sip", "slurp"], execute: handleDrink },
	{ name: "go", aliases: ["walk", "move"], execute: handleGo },
	{ name: "north", aliases: ["n"], execute: createDirectionalHandler("north") },
	{ name: "east", aliases: ["e"], execute: createDirectionalHandler("east") },
	{ name: "west", aliases: ["w"], execute: createDirectionalHandler("west") },
	{ name: "south", aliases: ["s"], execute: createDirectionalHandler("south") },
	{ name: "back", execute: handleGoBack },
	{ name: "exit", execute: handleExit },
];
