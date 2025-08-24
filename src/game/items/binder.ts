import { useGameStore } from "../store";

const workExp = `
  • Code Symphony (Feb 2024 — Jul 2025)
    Full Stack Developer
    - Built responsive web apps using React.js and Next.js App Router with TailwindCSS and MaterialUI
    - Developed REST and GraphQL APIs using Node.js (Express) and Nest.js
    - Integrated AWS services (DynamoDB, SES, Amplify) for scalable serverless infrastructure
    - Conducted PR reviews and managed Git workflows in Agile environment
    
  • Vodafone Intelligent Solutions (Jul 2024 — Dec 2024)
    UI/UX & Data Visualization Intern
    - Designed PowerApps to automate workflows
    - Built dashboards in Power BI to improve decision-making
    - Integrated Power Automate for business process automation
    - Worked with stakeholders on requirements, gap analysis, and solution delivery
`;

const useInspectBinder = () => {
	const { addLine } = useGameStore.getState();
	addLine(`Inside: a chronologically arranged archive of professional toil. Proof that one can, in fact, spend years building things only for them to be summarized in bullet points no one will ever fully read.
  ${workExp}
Riveting stuff. Please, try to contain your excitement.`);
};

const useBinder = () => {
	const { addLine } = useGameStore.getState();
	addLine(`Use it? It's a binder, not a spellbook. Here's what's inside:
  ${workExp}
A whole career arc, flattened into bullet points recruiters skim in six seconds.`);
};

export const binder: Item = {
	id: "binder",
	name: "binder",
	aliases: [
		"work exp",
		"work experience",
		"work experiences",
		"past exp",
		"past experience",
		"past experiences",
		"prev exp",
		"prev experience",
		"prev experiences",
	],
	roomMention: "A hefty binder sits on the desk labelled 'Work Experience'.",
	inspectItem: useInspectBinder,
	use: useBinder,
	portable: false,
};
