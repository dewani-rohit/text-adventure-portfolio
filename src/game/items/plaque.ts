import { useGameStore } from "../store";

const aboutMe = `
  • Summary
    Rohit is a full-stack developer with a knack for building scalable, polished applications and a questionable fondness for refactoring things that were working perfectly fine. Educated in computer science, he has balanced formal learning with hands-on projects, combining theoretical rigor with practical experience in modern web development. In short: capable, adaptable, and just masochistic enough to wrestle with JavaScript on a regular basis.
    
  • Skills
    - Frontend: React.js, Next.js (App Router), TailwindCSS
    - Backend: Node.js (Express, Nest.js), GraphQL, REST APIs
    - Database & Infra: PostgreSQL, DynamoDB, Supabase, AWS
    - Other: Git workflows, Agile rituals, PR reviews, Power BI, PowerApps, Power Automate
    `;

const useInspectPlaque = () => {
	const { addLine } = useGameStore.getState();
	addLine(`The plaque reads:
    ${aboutMe}
And there you have it — an entire career condensed into a wall-mounted brag sheet. Because LinkedIn wasn't self-congratulatory enough.`);
};

const usePlaque = () => {
	const { addLine } = useGameStore.getState();
	addLine(`Use the plaque? What were you expecting — that it opens a secret passage? No, it just says this:
    ${aboutMe}
Because why settle for a résumé when you can have literal monument-grade self-promotion?`);
};

export const plaque: Item = {
	id: "plaque",
	name: "plaque",
	roomMention:
		"A plaque proudly mounted on the wall, containing information about Rohit.",
	inspectItem: useInspectPlaque,
	use: usePlaque,
	portable: false,
};
