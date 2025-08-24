import { useEffect, useRef } from "react";
import { useGameStore } from "../game/store";
import { processCommand } from "../game/commandProcessor";

const Game = () => {
	const { history, startGame } = useGameStore();
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
			processCommand(value);
			(e.target as HTMLInputElement).value = "";
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
