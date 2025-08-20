import { create } from "zustand";
import type { StorageValue } from "zustand/middleware";
import { persist } from "zustand/middleware";
import { rooms } from "./rooms";
import { generateRoomItemsDescription } from "../utils";
import { coffeeMachine } from "./items/coffeeMachine";
import { clock } from "./items/clock";
import { fridge } from "./items/fridge";

const INITIAL_ROOM_ITEMS: { [roomId: string]: Item[] } = {
	lobby: [coffeeMachine, clock, fridge],
};

const INITIAL_FLAGS: { [flag: string]: boolean | number } = {
	isFridgeOpen: false,
};

const initializeGameState = () => ({
	history: [],
	currentRoom: "lobby",
	previousRoom: null,
	roomItems: INITIAL_ROOM_ITEMS,
	gameFlags: INITIAL_FLAGS,
});

export const useGameStore = create<GameStore>()(
	persist(
		(set, get) => ({
			...initializeGameState(),

			addLine: (text, role = "system") =>
				set((state) => ({
					history: [...state.history, { role, text }],
				})),

			startGame: () => {
				if (get().history.length === 0) {
					set(initializeGameState());
					get().setCurrentRoom("lobby");
				}
			},

			restartGame: () => {
				set(initializeGameState());
				get().setCurrentRoom("lobby");
			},

			setCurrentRoom: (roomId) => {
				set((state) => ({
					currentRoom: roomId,
					previousRoom: state.currentRoom,
				}));
				const room = rooms[roomId];

				if (room) {
					const roomDesc = room.briefDescription;
					const roomItems = get().roomItems[room.id];

					const description = generateRoomItemsDescription(roomDesc, roomItems);

					get().addLine(`\n[${room.name}]\n${description}`);
				}
			},

			setFlag: (flag, value) =>
				set((state) => ({
					gameFlags: { ...state.gameFlags, [flag]: value },
				})),
		}),
		{
			name: "game-session",
			storage: {
				getItem: (name) => {
					const str = sessionStorage.getItem(name);
					return str ? (JSON.parse(str) as StorageValue<GameStore>) : null;
				},
				setItem: (name, value) => {
					sessionStorage.setItem(name, JSON.stringify(value));
				},
				removeItem: (name) => sessionStorage.removeItem(name),
			},
		}
	)
);
