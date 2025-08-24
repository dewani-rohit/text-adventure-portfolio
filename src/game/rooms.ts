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
		briefDescription:
			"The Office — a space marked by restraint and quiet formality.",
		detailedDescription:
			"The Office carries an air of subdued professionalism, its design leaning more toward function than flair.",
		exitDescription: "An exit to the south returns you to the Lobby.",
		exits: { south: "lobby" },
	},
	lab: {
		id: "lab",
		name: "Lab",
		briefDescription:
			"A dimly lit chamber where ideas hum louder than the lights.",
		detailedDescription:
			"A dimly lit chamber where ideas hum louder than the lights.",
		exitDescription: "An exit to the west returns you to the Lobby.",
		exits: { west: "lobby" },
	},
	study: {
		id: "study",
		name: "Study",
		briefDescription: "",
		detailedDescription: "",
		exitDescription: "An exit to the east returns you to the Lobby.",
		exits: { east: "lobby" },
	},
};
