interface HistoryLine {
	role: "system" | "player";
	text: string;
}

interface Room {
	id: string;
	name: string;
	briefDescription: string;
	detailedDescription: string;
}

interface Item {
	id: string;
	name: string;
	briefDescription: string;
	detailedDescription: string;
}

interface GameState {
	history: HistoryLine[];
	currentRoom: string;
	previousRoom: string | null;
	roomItems: { [roomId: string]: string[] };
}

interface GameActions {
	startGame: () => void;
	restartGame: () => void;
	addLine: (text: string, role?: "system" | "player") => void;
	setCurrentRoom: (roomId: string) => void;
}

type GameStore = GameState & GameActions;

interface CommandDefinition {
	name: string;
	aliases?: string[];
	execute: (target: string, context: GameStore) => void;
}
