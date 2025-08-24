import { useGameStore } from "../store";

const projectData = () => {
	const { addLine } = useGameStore.getState();
	addLine(`
    • [CoreDump]
      Developer-focused Q&A platform
      - Stack: Next.js, TypeScript, MongoDB, TailwindCSS
      - Features: voting, bookmarking, reputation system
      - Auth: Clerk | Validation: Zod
      - Deployment: Vercel
`);
	addLine("live site", "system-link", "https://core-dump.vercel.app/");
	addLine(
		"github repo",
		"system-link",
		"https://github.com/dewani-rohit/core-dump/"
	);
	addLine(`
    • [Gather]
      Full-stack event management platform
      - Stack: Next.js, TypeScript, MongoDB, TailwindCSS
      - Features: event creation, filtering, searching, discovery, secure payments, uploads
      - Payments: Stripe | Uploads: UploadThing
      - Deployment: Vercel
`);
	addLine("live site", "system-link", "https://gather-events.vercel.app/");
	addLine(
		"github repo",
		"system-link",
		"https://github.com/dewani-rohit/next-event-platform"
	);
};

const useConsole = () => {
	const { addLine } = useGameStore.getState();
	addLine(
		"Attempting to use a console as if it were a toaster. Surprisingly, it works. Projects detected. Attempting to sound more impressive than they actually are…"
	);
	projectData();
	addLine(`
Satisfied? The console certainly hopes so.
`);
};

const useInspectConsole = () => {
	const { addLine } = useGameStore.getState();
	addLine(
		"The console hums to life, flickers, and begins outputting project data."
	);
	projectData();
	addLine(`
End of projects. Insert applause here.
`);
};

export const console: Item = {
	id: "console",
	name: "console",
	aliases: [
		"projects",
		"project",
		"project console",
		"terminal",
		"project terminal",
	],
	roomMention:
		"In the corner, a console quietly pulses with status lights, as if waiting for input.",
	inspectItem: useInspectConsole,
	use: useConsole,
	portable: false,
};
