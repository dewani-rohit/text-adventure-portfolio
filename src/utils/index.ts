import { items } from "../game/items";
import { cornetto } from "../game/items/cornetto";

export const generateRoomItemsDescription = (
	roomDesc: string,
	roomItems: Item[]
) => {
	let description = roomDesc + "\n";
	const distRoomItems = [...new Set(roomItems)];

	distRoomItems.map((item) => {
		description += `${item.roomMention} `;
	});

	return description;
};

export const findItem = (target: string, context: GameStore) => {
	const roomItems = context.roomItems[context.currentRoom];

	const itemInRoom = roomItems.find((item) =>
		[item.name, ...(item.aliases || [])].includes(target)
	);
	const itemInInventory = context.inventory.find((item) =>
		[item.name, ...(item.aliases || [])].includes(target)
	);
	const itemIsCornetto = [cornetto.name, ...cornetto.aliases!].includes(target)
		? cornetto
		: undefined;

	return itemInRoom || itemInInventory || itemIsCornetto;
};

export const getFridgeMessage = (
	cornettosInFridge: number,
	isOpening = false
) => {
	const prefix = isOpening ? "A faint chill escapes. Inside, " : "";

	if (cornettosInFridge === 0) {
		return "It offers nothing but cold air and existential disappointment.";
	}

	const cornettoText =
		cornettosInFridge === 3
			? "three cornettos await"
			: cornettosInFridge === 2
			? "two cornettos await"
			: "a single cornetto awaits";

	return `${prefix}${cornettoText}.`;
};

export const canAccessCornetto = (context: GameStore) => {
	const { roomItems, inventory, currentRoom, gameFlags } = context;

	const isInRoom = roomItems[currentRoom].some((i) => i.id === "cornetto");
	const isInInventory = inventory.some((i) => i.id === "cornetto");
	if (isInRoom || isInInventory) {
		return true;
	}

	if (currentRoom === "lobby") {
		if ((gameFlags["cornettosInFridge"] as number) === 0) return false;
		if (gameFlags["isFridgeOpen"]) {
			return true;
		}
	}

	return false;
};

export const getRandomResponse =
	(responses: string[] | ((target: string) => string[])) =>
	(target?: string) => {
		const responseArray =
			typeof responses === "function" ? responses(target!) : responses;
		return responseArray[Math.floor(Math.random() * responseArray.length)];
	};

export const validateCommand = (
	target: string,
	context: GameStore,
	options: {
		expectedTarget?: string;
		noTargetMessage?: string;
		needsItem?: boolean;
		allowRoom?: boolean;
		roomMessage?: string;
	}
) => {
	const { expectedTarget, noTargetMessage, needsItem, allowRoom, roomMessage } =
		options;

	if (noTargetMessage && !target) {
		context.addLine(noTargetMessage);
		return true;
	}

	if (expectedTarget && target && target !== expectedTarget) {
		context.addLine("Alas, something about that input escapes comprehension.");
		return true;
	}

	if (!expectedTarget && !needsItem && !allowRoom && target) {
		context.addLine("Alas, something about that input escapes comprehension.");
		return true;
	}

	if (target === "room") {
		if (allowRoom && roomMessage) {
			context.addLine(roomMessage);
			return true;
		}
		if (!allowRoom) {
			context.addLine(
				roomMessage ||
					"That's not how rooms work. They tend to be the ones doing the holding."
			);
			return true;
		}
	}

	if (needsItem && target && target !== "room") {
		const itemExists = Object.values(items).some(
			(item) => item.name === target || item.aliases?.includes(target)
		);

		if (!itemExists) {
			if (
				target.split(" ").length >= 2 &&
				/\s+([a-zA-Z]+(?:\s+[a-zA-Z]+)*)/.test(target)
			) {
				context.addLine(
					"Alas, something about that input escapes comprehension."
				);
				return true;
			}
			context.addLine(`I do not know what "${target}" is.`);
			return true;
		}
	}

	return false;
};

export const createLookResponses = () => ({
	in: "You take a moment to peer into yourself. The results are inconclusive.",
	at: "At... what, precisely? A little specificity would be delightful.",
	out: "Look out! False alarm. Carry on.",
});

export const generateInventoryDisplay = (inventory: Item[]) => {
	let response = `You are currently holding [${inventory.length}/5]:\n`;
	const inventorySet = new Set(inventory);
	inventorySet.forEach((i) => {
		const count = inventory.filter((item) => item.id === i.id).length;
		response += `• ${i.name[0].toUpperCase() + i.name.slice(1)} — ${count}\n  ${
			i.describeItem
		}\n`;
	});
	return response;
};
