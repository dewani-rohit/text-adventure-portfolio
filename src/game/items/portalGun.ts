import { rooms } from "../rooms";
import { useGameStore } from "../store";

const useInspectGun = () => {
	const { addLine } = useGameStore.getState();
	addLine(
		"You eye the portal gun. Glowing buttons, a suspicious barrel, and sheer potential for chaos."
	);
};

const useGun = () => {
	const { currentRoom, addLine, setCurrentRoom, inventory } =
		useGameStore.getState();

	const hasGun = inventory.some((i) => i.id === "portalGun");

	if (!hasGun) {
		addLine("You are not in possession of the portal gun.");
		return;
	}

	const allRooms = Object.keys(rooms);
	const potentialRooms = allRooms.filter((room) => room !== currentRoom);
	const randomRoom =
		potentialRooms[Math.floor(Math.random() * potentialRooms.length)];

	addLine(`You fire the gun and step into the portal. You are now standing in...
      
`);
	setCurrentRoom(randomRoom);
};

const useTakeGun = () => {
	const { addToInventory, addLine, removeItemFromRoom, currentRoom } =
		useGameStore.getState();

	removeItemFromRoom(portalGun, currentRoom);
	addToInventory(portalGun);
	addLine(
		"You pick up the portal gun. Feels heavier than expected. Handle with care... or reckless curiosity."
	);
};

const useDropGun = () => {
	const { removeFromInventory, addLine, moveItemToRoom, currentRoom } =
		useGameStore.getState();

	removeFromInventory(portalGun);
	moveItemToRoom(portalGun, currentRoom);
	addLine(
		"You set the portal gun down carefully. Some things are better admired from a distance."
	);
};

export const portalGun: Item = {
	id: "portalGun",
	name: "portal gun",
	aliases: ["gun"],
	roomMention:
		"A portal gun sits on the table, humming with interdimensional mischief.",
	describeItem: "Portal Gun — Definitely not your average paperweight.",
	inspectItem: useInspectGun,
	use: useGun,
	portable: true,
	take: useTakeGun,
	drop: useDropGun,
};
