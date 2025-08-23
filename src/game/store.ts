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
	cornettosInFridge: 3,
	cornettosConsumed: 0,
};

const initializeGameState = () => ({
	history: [],
	currentRoom: "",
	previousRoom: null,
	roomItems: INITIAL_ROOM_ITEMS,
	gameFlags: INITIAL_FLAGS,
	inventory: [],
});

export const useGameStore = create<GameStore>()(
	persist(
		(set, get) => ({
			...initializeGameState(),

			addLine: (text, role = "system") =>
				set((state) => ({
					history: [...state.history, { role, text }],
				})),

			setCurrentRoom: (roomId) => {
				set((state) => ({
					previousRoom: state.currentRoom,
					currentRoom: roomId,
				}));
				const room = rooms[roomId];

				if (room) {
					const roomDesc = `${room.briefDescription} ${room.exitDescription}`;
					const roomItems = get().roomItems[room.id];

					const description = generateRoomItemsDescription(roomDesc, roomItems);

					get().addLine(`\n[${room.name}]\n${description}`);
				}
			},

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

			setFlag: (flag, value) =>
				set((state) => ({
					gameFlags: { ...state.gameFlags, [flag]: value },
				})),

			addToInventory: (item) =>
				set((state) => ({
					inventory: [...state.inventory, item],
				})),

			removeFromInventory: (item) => {
				const indexToRemove = get().inventory.findIndex(
					(i) => i.id === item.id
				);

				set((state) => ({
					inventory: state.inventory.filter(
						(_, index) => index !== indexToRemove
					),
				}));
			},

			updateInventoryItem: (itemId, updates) =>
				set((state) => ({
					inventory: state.inventory.map((i) =>
						i.id === itemId ? { ...i, ...updates } : i
					),
				})),

			moveItemToRoom: (item, roomId) =>
				set((state) => ({
					roomItems: {
						...state.roomItems,
						[roomId]: [...(state.roomItems[roomId] || []), item],
					},
				})),

			removeItemFromRoom: (item, roomId) => {
				const indexToRemove = get().roomItems[roomId].findIndex(
					(i) => i.id === item.id
				);

				set((state) => ({
					roomItems: {
						...state.roomItems,
						[roomId]: (state.roomItems[roomId] || []).filter(
							(_, index) => index !== indexToRemove
						),
					},
				}));
			},
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
