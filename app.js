//Recomendado importar primero las importaciones de terceros
require('colors');

const { inquirerMenu, pauseMenu, readUserInput } = require('./helpers/inquirer');
const Task = require('./models/task');
const TaskManager = require('./models/task-manager');
const { saveOnFile } = require('./persistence/persistence');

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

				saveOnFile(taskManager.getListOfAllTasks);
				break;
			case 2:
				console.log(taskManager._list);
				break;
			case 3:
				break;
		}

		await pauseMenu();
	} while (opt !== 0);
};

main();
