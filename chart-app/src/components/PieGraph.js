import React from "react";
import { Pie } from "react-chartjs-2";
import { useCubeQuery } from "@cubejs-client/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieGraph = () => {
	const pieQuery = {
		measures: ["Orders.count"],
		dimensions: ["Orders.amount"],
	};

	const { resultSet, error } = useCubeQuery(pieQuery);

	const data = React.useMemo(() => {
		if (!resultSet) return { labels: [], datasets: [] };

		return {
			labels: resultSet.dimensionValues(0) || [],
			datasets: [
				{
					label: "Order Counts by Amount",
					data: resultSet.series()[0]?.data || [],
					backgroundColor: [
						"rgba(255,99,132,0.2)",
						"rgba(54,162,235,0.2)",
						"rgba(255,206,86,0.2)",
						"rgba(75,192,192,0.2)",
						"rgba(153,102,255,0.2)",
						"rgba(255,159,64,0.2)",
					],
					borderColor: [
						"rgba(255,99,132,1)",
						"rgba(54,162,235,1)",
						"rgba(255,206,86,1)",
						"rgba(75,192,192,1)",
						"rgba(153,102,255,1)",
						"rgba(255,159,64,1)",
					],
					borderWidth: 1,
				},
			],
		};
	}, [resultSet]);

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return <Pie data={data} />;
};

export default PieGraph;
