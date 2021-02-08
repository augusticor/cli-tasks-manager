const fs = require('fs');

const saveOnFile = (data) => {
	const route = './persistence/tasks.json';

	fs.writeFileSync(route, JSON.stringify(data));
};

module.exports = {
	saveOnFile,
};
