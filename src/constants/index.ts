export const helpResponse = `Available commands:
• help - Displays the catalogue of sanctioned commands (because apparently intuition isn't enough).
• look - Survey your surroundings in detail.
• inventory - Review the meager contents of your pockets.
• inspect [object] - Examine something thoroughly (or at least pretend you are).
• use [object] - Attempt to interact with the object.
• take [object] - Attempt to acquire an item.
• drop [object] - Attempt to relieve yourself of an item.
• go [direction] - Go in the specified direction.`;

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

export const notPortableResponses = [
	"That's not the sort of thing you can just pocket.",
	"That object is staying put.",
	"Sadly, some things refuse to be reduced to carry-on size.",
	"You could try, yes. But you'd look ridiculous lugging that around.",
	"The universe has many rules. One of them: you can't take that.",
];

export const badTakeResponses = (target: string) => [
	`You scan the room for ${target}. Zero results.`,
	`Acquiring ${target} would be easier if it actually existed in this room.`,
	`No ${target} in sight. Unless you're seeing something I'm not.`,
	`A flawless plan—ruined only by the absence of ${target} lying around.`,
];

export const badDropResponses = [
	"Fascinating. Letting go of something that was never yours to begin with.",
	"Hard to drop what you never had.",
	"That item isn't in your possession. You can't discard what you never owned.",
	"You'd need to hold it first. Tiny detail, really.",
	"Marvelous idea: throwing away items that aren't in your possession. Do let me know how that works out.",
];

export const inventoryFullResponses = [
	"Your collection of worldly burdens has reached capacity. No more fits.",
	"Nope. Not one more thing. You've reached maximum hoarder chic.",
	"You're carrying enough already. Try letting go of something for once.",
	"Full capacity reached. Like a fridge the day before a diet starts.",
	"Inventory full. Nothing else is going in.",
];

export const emptyInventoryResponses = [
	"You carry nothing but time and misplaced ambition.",
	"You search your pockets. They contain only lint and disappointment.",
	"Currently equipped with: a profound lack of things.",
	"Your belongings list is blank. Minimalism at its purest.",
	"You check your inventory. It resembles a magician's hat — but without the rabbit.",
];
