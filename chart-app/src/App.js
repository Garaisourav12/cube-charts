import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import cubejs from "@cubejs-client/core";
import BarGraph from "./components/BarGraph";
import LineGraph from "./components/LineGraph";
import PieGraph from "./components/PieGraph";
import { CubeProvider } from "@cubejs-client/react";

const cubejsApi = cubejs(
	"b95418d846ba6e672b0c41a901f13f1cd2343a685690d8a8b3ab8a2398ec14087875db989c2773a9b23fbe4578b3f47d90ff36e6e826b64c1e02d2807e73bf0c", // Replace with your actual Cube.js API token
	{ apiUrl: "http://localhost:4000/cubejs-api/v1" }
);

function App() {
	return (
		<CubeProvider cubejsApi={cubejsApi}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<h1>Welcome</h1>} />
					<Route path="/bar" element={<BarGraph />} />
					<Route path="/line" element={<LineGraph />} />
					<Route path="/pie" element={<PieGraph />} />
				</Routes>
			</BrowserRouter>
		</CubeProvider>
	);
}

export default App;
