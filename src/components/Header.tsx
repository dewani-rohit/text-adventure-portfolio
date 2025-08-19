const Header = () => {
	return (
		<section className="mb-10 text-muted px-5">
			<pre className="hidden sm:block text-accent text-xs">
				{String.raw`

______      _     _ _    ______                         _ 
| ___ \    | |   (_) |   |  _  \                       (_)
| |_/ /___ | |__  _| |_  | | | |_____      ____ _ _ __  _ 
|    // _ \| '_ \| | __| | | | / _ \ \ /\ / / _' | '_ \| |
| |\ \ (_) | | | | | |_  | |/ /  __/\ V  V / (_| | | | | |
\_| \_\___/|_| |_|_|\__| |___/ \___| \_/\_/ \__,_|_| |_|_|
        `}
			</pre>

			<pre className="block sm:hidden text-accent text-xs">
				{String.raw`
				
______      _     _ _    ______
| ___ \    | |   (_) |   |  _  \
| |_/ /___ | |__  _| |_  | | | |
|    // _ \| '_ \| | __| | | | /
| |\ \ (_) | | | | | |_  | |/ /
\_| \_\___/|_| |_|_|\__| |___/
        `}
			</pre>

			<div>
				<p className="mb-4">
					Ah, a new visitor. I am Expositron 3000, certified Narration Unit,
					assigned to guide you through this world.
				</p>

				<p className="mb-4">
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
