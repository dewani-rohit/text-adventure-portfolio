const Header = () => {
	return (
		<section className="mb-10 text-muted px-5">
			<pre className="text-accent text-[0.5rem]">
				{String.raw`

██████   ██████  ██   ██ ██ ████████     ██████  ███████ ██     ██  █████  ███    ██ ██ 
██   ██ ██    ██ ██   ██ ██    ██        ██   ██ ██      ██     ██ ██   ██ ████   ██ ██ 
██████  ██    ██ ███████ ██    ██        ██   ██ █████   ██  █  ██ ███████ ██ ██  ██ ██ 
██   ██ ██    ██ ██   ██ ██    ██        ██   ██ ██      ██ ███ ██ ██   ██ ██  ██ ██ ██ 
██   ██  ██████  ██   ██ ██    ██        ██████  ███████  ███ ███  ██   ██ ██   ████ ██
        `}
			</pre>

			<div className="text-sm">
				<p className="mb-2">
					Ah, a new visitor. I am Expositron 3000, certified Narration Unit,
					assigned to guide you through this world.
				</p>

				<p className="mb-2">
					If you prefer a less adventurous format, you may instead visit{" "}
					<a
						href={import.meta.env.VITE_PORTFOLIO_SITE_URL}
						className="border-b border-dashed"
						target="_blank"
						rel="noreferrer"
					>
						the standard portfolio.
					</a>
				</p>

				<p>
					Type{" "}
					<code className="font-mono text-text bg-muted/20 py-0.5 px-1">
						help
					</code>{" "}
					if you need guidance (and let's be honest, you probably do).
				</p>
			</div>
		</section>
	);
};
export default Header;
