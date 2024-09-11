import React from "react";
import { Line } from "react-chartjs-2";
import { useCubeQuery } from "@cubejs-client/react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	LineElement,
	Tooltip,
	Legend,
	Title,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const LineGraph = () => {
	const lineQuery = {
		measures: ["Orders.count"],
		timeDimensions: [
			{
				dimension: "Orders.createdAt",
				dateRange: ["2024-01-01", "2024-12-31"],
			},
		],
		dimensions: [],
	};

	const { resultSet, error } = useCubeQuery(lineQuery);

	const data = React.useMemo(() => {
		if (!resultSet) return { labels: [], datasets: [] };

		return {
			labels: resultSet.timeDimensions()[0]?.dateValues || [],
			datasets: [
				{
					label: "Order Counts Over Time",
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

	return <Line data={data} />;
};

export default LineGraph;
