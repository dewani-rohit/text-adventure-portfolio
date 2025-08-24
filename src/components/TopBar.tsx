import { rooms } from "../game/rooms";
import { useGameStore } from "../game/store";

const TopBar = () => {
	const { currentRoom } = useGameStore();

	return (
		<div className="px-5 py-2 bg-accent text-panel sticky inset-x-0 top-0 flex items-center justify-between">
			<p>{rooms[currentRoom].name}</p>
			<a
				href={import.meta.env.VITE_PORTFOLIO_SITE_URL}
				className="border-b border-dashed text-sm"
				target="_blank"
				rel="noreferrer"
			>
				visit standard portfolio
			</a>
		</div>
	);
};
export default TopBar;
