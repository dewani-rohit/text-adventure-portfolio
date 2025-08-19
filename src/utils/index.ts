import { items } from "../game/items";

export const generateRoomItemsDescription = (
	roomDesc: string,
	roomItems: string[]
) => {
	let description = roomDesc + "\n";

	roomItems.forEach(
		(item: string) => (description += items[item].briefDescription + "\n")
	);

	return description;
};
