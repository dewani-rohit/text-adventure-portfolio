export const generateRoomItemsDescription = (
	roomDesc: string,
	roomItems: Item[]
) => {
	let description = roomDesc + "\n";

	roomItems.map((item) => (description += item.briefDescription + "\n"));

	return description;
};
