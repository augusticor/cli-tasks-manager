import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const filePath = './persistence/tasks.json';

const saveOnFile = (data) => {
	writeFileSync(filePath, JSON.stringify(data));
};

const readFromFile = () => {
	if (!existsSync(filePath)) {
		return null;
	}

	const stringInfo = readFileSync(filePath, { encoding: 'utf-8' });

	const data = JSON.parse(stringInfo);

	// fs.readFile(filePath, { encoding: 'utf-8' }, (error, data) => {
	// 	if (error) throw error;

	// 	const parsedData = JSON.parse(data);
	// 	return parsedData;
	// });

	return data;
};



export { readFromFile, saveOnFile };
