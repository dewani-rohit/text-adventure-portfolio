interface HistoryLine {
	role: "system" | "system-link" | "player";
	text: string;
	link?: string;
}

interface Room {
	id: string;
	name: string;
	briefDescription: string;
	detailedDescription: string;
	exitDescription: string;
	exits: { [key: string]: string };
}

interface Item {
	id: string;
	name: string;
	aliases?: string[];
	roomMention: string;
	describeItem?: string;
	inspectItem: () => void;
	use: () => void;
	take?: () => void;
	drop?: () => void;
	portable: boolean;
	usesLeft?: number;
	eatable?: boolean;
	drinkable?: boolean;
}

interface GameState {
	history: HistoryLine[];
	currentRoom: string;
	previousRoom: string | null;
	roomItems: { [roomId: string]: Item[] };
	gameFlags: { [key: string]: boolean | number };
	inventory: Item[];
}

interface GameActions {
	startGame: () => void;
	restartGame: () => void;
	addLine: (
		text: string,
		role?: "system" | "system-link" | "player",
		link?: string
	) => void;
	setCurrentRoom: (roomId: string) => void;
	setFlag: (flag: string, value: boolean | number) => void;
	addToInventory: (item: Item) => void;
	removeFromInventory: (item: Item) => void;
	updateInventoryItem: (id: string, updates: Partial<Item>) => void;
	moveItemToRoom: (item: Item, roomId: string) => void;
	removeItemFromRoom: (item: Item, roomId: string) => void;
}

type GameStore = GameState & GameActions;

interface CommandDefinition {
	name: string;
	aliases?: string[];
	execute: (target: string, context: GameStore) => void;
}
