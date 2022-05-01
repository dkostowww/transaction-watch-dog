module.exports = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Transaction watch dog API',
			version: '1.0.0',
			description: 'A Transaction watch dog API docs',
		},
		servers: [
			{
				url: `http://localhost:${process.env.SERVER_PORT || 8000}`,
			},
		],
	},
	apis: ['./src/utils/router.js'],
};