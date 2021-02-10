const Task = require('./task');

class TaskManager {
	constructor() {
		this._list = {};
	}

	createTask(desc) {
		const task = new Task(desc);

		this._list[task.id] = task;
	}

	printStylizedTasks() {
		//This returns the list of uuids
		const taskListOnArrayMode = Object.keys(this._list);

		console.log();
		let isAchievedYet = 'Incomplete';

		for (let i = 0; i < taskListOnArrayMode.length; i++) {
			const eachTask = this._list[taskListOnArrayMode[i]];

			isAchievedYet = eachTask.achievedIn !== null ? 'Complete'.green : 'Incomplete'.red;
			console.log(`${`${i}.`.yellow} ${eachTask.desc} \t ${isAchievedYet}\n`);
		}
	}

	/**
	 * Optimized method
	 */
	printStylizedTasks2() {
		console.log();
		this.getListOfAllTasks.forEach((task, i) => {
			const taskIndex = `${i + 1}.`.yellow;
			const { desc, achievedIn } = task;

			const taskStatus = achievedIn ? 'Complete'.green : 'Incomplete'.red;

			console.log(`${taskIndex} ${desc} \t ${taskStatus}`);
		});
	}

	/**
	 * Using the aux method: printArrayOfTasks
	 */
	printStylizedTasks3() {
		this.printArrayOfTasks(this.getListOfAllTasks);
	}

	loadTasksFromArray(tasks) {
		for (const task of tasks) {
			this._list[task.id] = task;
		}
	}

	get getListOfAllTasks() {
		const arrayListOfTasks = [];

		Object.keys(this._list).forEach((uuidkey) => {
			const eachTask = this._list[uuidkey];
			arrayListOfTasks.push(eachTask);
		});

		return arrayListOfTasks;
	}

	/**
	 * List the tasks that meet the given completed status
	 * @param { boolean } status of the tasks whether completed or not
	 */
	listsTasksByStatus(status) {
		if (status) {
			return this.getListOfAllTasks.filter((task) => task.achievedIn);
		}
		return this.getListOfAllTasks.filter((task) => !task.achievedIn);
	}

	/**
	 * Deletes a task from _list
	 * @param { String } id
	 */
	deleteTasks(id) {
		if (this._list[id]) {
			delete this._list[id];
		}
	}

	/**
	 * Searches the specified task by ID
	 * @param { String } id
	 */
	searchTaskByID(id = '') {
		return this.getListOfAllTasks.find((task) => task.id === id);
	}

	/**
	 * Marks as complete the selected tasks from the user
	 * @param { Array } selectedTasksIDS
	 */
	completeTasks(selectedTasksIDS = []) {
		selectedTasksIDS.forEach((taskID) => {
			this._list[taskID].achievedIn = new Date().toISOString();
		});
	}

	/**
	 * Prints on cli the tasks of an array
	 * @param { Array } arrayOfTasks the array to show
	 */
	printArrayOfTasks(arrayOfTasks) {
		console.log();
		arrayOfTasks.forEach((task, i) => {
			const taskIndex = `${i + 1}.`.yellow;
			const { desc, achievedIn } = task;

			const taskStatus = achievedIn ? `Completed on ${task.achievedIn}`.green : 'Incomplete'.red;

			console.log(`${taskIndex} ${desc} \t ${taskStatus}`);
		});
	}
}

module.exports = TaskManager;
