import { create } from "zustand";
import type { StorageValue } from "zustand/middleware";
import { persist } from "zustand/middleware";
import { rooms } from "./rooms";

const initializeGameState = () => ({
	history: [],
	currentRoom: "lobby",
	previousRoom: null,
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
					get().addLine(`\n[${room.name}]`);
					get().addLine(room.briefDescription);
				}
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
