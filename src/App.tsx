import "./App.css";
import Game from "./components/Game";
import Header from "./components/Header";
import TopBar from "./components/TopBar";

function App() {
	return (
		<>
			<TopBar />
			<div className="max-w-4xl">
				<Header />
				<Game />
			</div>
		</>
	);
}

export default App;
