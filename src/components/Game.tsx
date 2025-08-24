import { useEffect, useRef } from "react";
import { useGameStore } from "../game/store";
import { processCommand } from "../game/commandProcessor";

const Game = () => {
	const {
		history,
		startGame,
		addCommand,
		historyIndex,
		commandHistory,
		setHistoryIndex,
	} = useGameStore();
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		startGame();
		inputRef.current?.focus();
	}, [startGame]);

	useEffect(() => {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: "smooth",
		});
	}, [history]);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			const value = (e.target as HTMLInputElement).value;
			if (value.trim()) {
				addCommand(value);
			}
			processCommand(value);
			(e.target as HTMLInputElement).value = "";
		}
		if (e.key === "ArrowUp") {
			e.preventDefault();
			const newIndex =
				historyIndex === -1
					? commandHistory.length - 1
					: Math.max(0, historyIndex - 1);
			setHistoryIndex(newIndex);
			if (commandHistory[newIndex]) {
				(e.target as HTMLInputElement).value = commandHistory[newIndex];
			}
		}
		if (e.key === "ArrowDown") {
			e.preventDefault();
			const newIndex = Math.min(commandHistory.length, historyIndex + 1);
			setHistoryIndex(newIndex);

			if (newIndex === commandHistory.length) {
				(e.target as HTMLInputElement).value = "";
			} else {
				(e.target as HTMLInputElement).value = commandHistory[newIndex];
			}
		}
	};

	return (
		<section className="px-5 font-mono pb-10">
			<div>
				{history.map((line, index) => (
					<div
						key={index}
						className={`${
							line.role === "player" ? "text-accent my-2" : ""
						} whitespace-pre-wrap`}
					>
						{line.role === "system-link" ? (
							<>
								<span>{"	  "}</span>
								<a
									href={line.link}
									target="_blank"
									rel="noreferrer"
									className="border-b border-dashed"
								>
									{line.text}
								</a>
							</>
						) : (
							<div>{line.text}</div>
						)}
					</div>
				))}
			</div>

			<div className="flex items-center my-2 text-accent gap-2">
				<span>&gt;</span>

				<input
					type="text"
					className="flex-1 bg-transparent border-none outline-none"
					ref={inputRef}
					onKeyDown={handleKeyDown}
				/>
			</div>
		</section>
	);
};
export default Game;
