//Recomendado importar primero las importaciones de terceros
require('colors');

const { inquirerMenu, pauseMenu } = require('./helpers/inquirer');
const Task = require('./models/task');
const TaskManager = require('./models/task-manager');

console.clear();

const main = async () => {
	let opt = 0;
	const taskManager = new TaskManager();

	do {
		opt = await inquirerMenu();

		console.log({ opt });

		await pauseMenu();
	} while (opt !== 0);
};

main();
