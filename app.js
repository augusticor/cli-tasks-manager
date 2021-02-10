//Recomendado importar primero las importaciones de terceros
require('colors');

const { inquirerMenu, pauseMenu, readUserInput, showListOfTasksToDelete, confirmMessage, showListOfPendingTasks } = require('./helpers/inquirer');
const Task = require('./models/task');
const TaskManager = require('./models/task-manager');
const { saveOnFile, readFromFile } = require('./persistence/persistence');

console.clear();

const main = async () => {
	let opt = 0;
	const taskManager = new TaskManager();

	const readFile = readFromFile();
	if (readFile) {
		taskManager.loadTasksFromArray(readFile);
	}

	do {
		opt = await inquirerMenu();

		switch (opt) {
			case 1: // Create a task
				const description = await readUserInput('Write the new task description');
				taskManager.createTask(description);
				saveOnFile(taskManager.getListOfAllTasks);
				break;
			case 2: // List all tasks
				taskManager.printStylizedTasks2();
				break;
			case 3: // List completed tasks
				taskManager.printArrayOfTasks(taskManager.listsTasksByStatus(true));
				break;
			case 4: // List pending tasks
				taskManager.printArrayOfTasks(taskManager.listsTasksByStatus(false));
				break;
			case 5: // Complete task(s)
				const selectedTasks = await showListOfPendingTasks(taskManager.listsTasksByStatus(false));
				taskManager.completeTasks(selectedTasks);
				saveOnFile(taskManager.getListOfAllTasks);
				break;
			case 6: // Delete task
				const id = await showListOfTasksToDelete(taskManager.getListOfAllTasks);
				if (id === 0) {
					break;
				}
				const task = await taskManager.searchTaskByID(id);
				const confirmation = await confirmMessage('Are you sure ?');
				if (confirmation) {
					taskManager.deleteTasks(id);
					console.log(`${task.desc}\nhas been deleted`.red);
				}
				saveOnFile(taskManager.getListOfAllTasks);
				break;
		}

		await pauseMenu();
	} while (opt !== 0);
};

main();
