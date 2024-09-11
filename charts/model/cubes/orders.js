cube(`Orders`, {
	sql: `SELECT * FROM orders`,

	measures: {
		count: {
			type: `count`,
			drillMembers: [id, createdAt],
		},

		totalAmount: {
			type: `sum`,
			sql: `amount`,
		},
	},

	dimensions: {
		id: {
			type: `number`,
			sql: `id`,
			primaryKey: true,
		},

		createdAt: {
			type: `time`,
			sql: `created_at`,
		},

		amount: {
			type: `number`,
			sql: `amount`,
		},
	},
});
