export const rooms: { [key: string]: Room } = {
	lobby: {
		id: "lobby",
		name: "Lobby",
		briefDescription:
			"The Lobby — a grand but curiously underwhelming chamber, serving as your point of orientation.",
		detailedDescription:
			"The Lobby features high ceilings, polished floors, and an atmosphere of formality. Its sole function is to exist as the point of commencement.",
		exitDescription:
			"To the north lies an office, to the west a study, and to the east a passage that leads into the lab.",
		exits: { north: "office", east: "lab", west: "study" },
	},
	office: {
		id: "office",
		name: "Office",
		briefDescription: "",
		detailedDescription: "",
		exitDescription: "",
		exits: { south: "lobby" },
	},
	lab: {
		id: "lab",
		name: "Lab",
		briefDescription: "",
		detailedDescription: "",
		exitDescription: "",
		exits: { west: "lobby" },
	},
	study: {
		id: "study",
		name: "Study",
		briefDescription: "",
		detailedDescription: "",
		exitDescription: "",
		exits: { east: "lobby" },
	},
};
