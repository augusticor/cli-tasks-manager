const fs = require('fs');

const filePath = './persistence/tasks.json';

const saveOnFile = (data) => {
	fs.writeFileSync(filePath, JSON.stringify(data));
};

const readFromFile = () => {
	if (!fs.existsSync(filePath)) {
		return null;
	}

	const stringInfo = fs.readFileSync(filePath, { encoding: 'utf-8' });

	const data = JSON.parse(stringInfo);

	// fs.readFile(filePath, { encoding: 'utf-8' }, (error, data) => {
	// 	if (error) throw error;

	// 	const parsedData = JSON.parse(data);
	// 	return parsedData;
	// });

	return data;
};

module.exports = {
	saveOnFile,
	readFromFile,
};
