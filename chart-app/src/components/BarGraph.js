import React from "react";
import { Bar } from "react-chartjs-2";
import { useCubeQuery } from "@cubejs-client/react";
import {
	Chart as ChartJS,
	CategoryScale,
	BarElement,
	Tooltip,
	Legend,
	Title,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, BarElement, Title, Tooltip, Legend);

const BarGraph = () => {
	const barQuery = {
		measures: ["Orders.count"],
		dimensions: ["Orders.amount"],
	};

	const { resultSet, error } = useCubeQuery(barQuery);

	const data = React.useMemo(() => {
		if (!resultSet) return { labels: [], datasets: [] };

		return {
			labels: resultSet.dimensionValues(0) || [], // Adjust based on your dimension
			datasets: [
				{
					label: "Order Counts by Amount",
					data: resultSet.series()[0]?.data || [],
					backgroundColor: "rgba(75,192,192,0.4)",
					borderColor: "rgba(75,192,192,1)",
					borderWidth: 1,
				},
			],
		};
	}, [resultSet]);

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return <Bar data={data} />;
};

export default BarGraph;
