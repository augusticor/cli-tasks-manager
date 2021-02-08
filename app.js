//Recomendado importar primero las importaciones de terceros
require('colors');

const { inquirerMenu, pauseMenu, readUserInput } = require('./helpers/inquirer');
const Task = require('./models/task');
const TaskManager = require('./models/task-manager');

console.clear();

const main = async () => {
	let opt = 0;
	const taskManager = new TaskManager();

	do {
		opt = await inquirerMenu();

		switch (opt) {
			case 1:
				const description = await readUserInput('Write the new task description');
				taskManager.createTask(description);
				break;
			case 2:
				console.log(taskManager._listado);
				break;
			case 3:
				break;
		}

		await pauseMenu();
	} while (opt !== 0);
};

main();
