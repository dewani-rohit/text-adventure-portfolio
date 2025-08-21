import { items } from "../game/items";
import { cornetto } from "../game/items/cornetto";
import { rooms } from "../game/rooms";

export const generateRoomItemsDescription = (
	roomDesc: string,
	roomItems: Item[]
) => {
	let description = roomDesc + "\n";

	roomItems.map((item) => (description += item.describeItem + "\n"));

	return description;
};

export const validateTarget = (target: string, expectedTarget?: string) => {
	if (target && expectedTarget && target !== expectedTarget) {
		return "Alas, something about that input escapes comprehension.";
	}
	return null;
};

export const validateItemExists = (target: string) => {
	const itemInGame = Object.values(items).some(
		(item) => item.name === target || item.aliases?.includes(target)
	);

	if (!itemInGame) {
		let regex = /\s+[a-zA-Z]+\s+\w+/.test(target);
		if (target.split(" ").length >= 2) {
			regex = /\s+([a-zA-Z]+(?:\s+[a-zA-Z]+)*)/.test(target);
		}

		if (regex) {
			return "Alas, something about that input escapes comprehension.";
		}
		return `I do not know what "${target}" is.`;
	}
	return null;
};

export const findItem = (target: string, context: GameStore) => {
	const room = rooms[context.currentRoom];
	const roomItems = context.roomItems[room.id];

	const itemInRoom = roomItems.find((item) => item.name === target);
	const itemInInventory = context.inventory.find(
		(item) => item.name === target || item.aliases?.includes(target)
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
