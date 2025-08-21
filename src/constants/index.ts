export const helpResponse = `Available commands:
• help - Displays the catalogue of sanctioned commands (because apparently intuition isn't enough).
• look - Survey your surroundings in detail.
• inspect [object] - Examine something thoroughly (or at least pretend you are).
• use [object] - Attempts to interact with the object.`;

export const blankResponses = [
	"Input not detected. Silence may be profound, but it is also unproductive.",
	"You have entered nothing. A bold move, though unlikely to achieve results.",
	"Your command is… nothing. Duly noted. Nothing will now occur.",
	"A blank submission — the textual equivalent of staring at the ceiling.",
	"…silence. One wonders if you are contemplating existence, or merely paralyzed by indecision.",
	"…nothing. If this is performance art, consider it underappreciated.",
	"…the absence of command. Surely intentional, though its meaning eludes even me.",
];

export const unknownResponses = [
	"Your request is unique. Unfortunately, uniqueness is not supported.",
	"An original suggestion, yes. A valid one, no.",
	"Unrecognized command. Creativity noted, functionality absent.",
	"That is not among the sanctioned lexicon of commands.",
	"The input bears no resemblance to any known instruction.",
	"Unrecognized directive. A daring invention, but unsupported.",
	"Invalid command. A bold attempt at originality, if nothing else.",
	"No such command is documented. At least, not in this reality.",
	"Instruction unrecognized. A command from an alternate manual, perhaps?",
	"Remarkable. You have discovered a command known only to absolutely no one.",
	"The archives applaud your imagination. They do not, however, obey it.",
];

export const badInspectResponses = [
	"You look, and you look hard. Sadly, nothing resembling that is here.",
	"Ah, the art of staring at things that do not exist. A bold choice.",
	"If such a thing were present, I'd have gladly described it for you. Alas, it is not.",
	"You attempt to observe it, but reality fails to cooperate.",
];

export const badOpenResponses = (target: string) => [
	`Opening ${target} is not possible. It simply isn't here.`,
	`You cannot open ${target}... mainly because it in not in this room.`,
	`Opening ${target}? Charming idea. Reality disagrees — it isn't here.`,
	`Attempting to open ${target} proves futile. It's not here.`,
];

export const badCloseResponses = (target: string) => [
	`Close ${target}? But it isn't even here.`,
	`Closing ${target} is ambitious as it is not present here.`,
	`You reach, you strain... but ${target} is not present in the room`,
	`You cannot close ${target}... mainly because it is not in the room.`,
];

export const badUseResponses = (target: string) => [
	`A noble attempt. Sadly, ${target} is not in here.`,
	`You look around. No ${target}. Just you, the room, and your questionable choices`,
	`You attempt using ${target}. It would help if ${target} were actually here.`,
	`An inspiring idea — employing ${target} where it does not exist.`,
];
