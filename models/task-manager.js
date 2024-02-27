import colorizeText from '../helpers/colors.js';
import Task from './task.js';

class TaskManager {
	constructor() {
		this._list = {};
	}

	/**
	 * Creates a task to do
	 * @param { String } desc description of the task
	 */
	createTask(desc) {
		const task = new Task(desc);

		this._list[task.id] = task;
	}

	/**
	 * Prints on terminal the tasks and shows if they are done or not
	 */
	printStylizedTasks() {
		//This returns the list of uuids
		const taskListOnArrayMode = Object.keys(this._list);

		console.log();
		let isAchievedYet = 'Incomplete';

		for (let i = 0; i < taskListOnArrayMode.length; i++) {
			const eachTask = this._list[taskListOnArrayMode[i]];

			isAchievedYet = eachTask.achievedIn!== null ? colorizeText('Complete', 'green') : colorizeText('Incomplete', 'red');
			console.log(`${colorizeText(i, 'yellow')} ${eachTask.desc} \t ${isAchievedYet}\n`);
		}
	}

	/**
	 * Optimized method of printStylizedTasks
	 */
	printStylizedTasks2() {
		console.log();
		this.getListOfAllTasks.forEach((task, i) => {
			const taskIndex = colorizeText(`${i + 1}.`, 'yellow');
			const { desc, achievedIn } = task;
			const taskStatus = achievedIn ? colorizeText('Complete', 'green') : colorizeText('Incomplete', 'red');

			console.log(`${taskIndex} ${desc} \t ${taskStatus}`);
		});
	}

	/**
	 * Using the aux method: printArrayOfTasks
	 */
	printStylizedTasks3() {
		this.printArrayOfTasks(this.getListOfAllTasks);
	}

	/**
	 * Creates the tasks from the file on persistence
	 * @param { Array } tasks of tasks objects from @class { Task }
	 */
	loadTasksFromArray(tasks) {
		for (const task of tasks) {
			this._list[task.id] = task;
		}
	}

	/**
	 * Returns all the tasks objects inside _list attribute
	 */
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
			const taskIndex = colorizeText(`${i + 1}.`, 'yellow');
			const { desc, achievedIn } = task;

			const taskStatus = achievedIn ? colorizeText(`Completed on ${this.getDateWithFormat(task.achievedIn)}`, 'green') : colorizeText('Incomplete', 'red');

			console.log(`${taskIndex} ${desc} \t ${taskStatus}`);
		});
	}

	/**
	 * Returns an ISOS Date in string styled format
	 * mm/dd/yyyy - hh:mm
	 * @param { String } stringDate a date on string format, ISOS Date
	 */
	getDateWithFormat(stringDate) {
		let date = new Date(stringDate);
		let day = date.getDate();
		let month = date.getMonth() + 1;
		let year = date.getFullYear();
		let hours = date.getHours();
		let minutes = date.getMinutes();

		return `${month}/${day}/${year} - ${hours}:${minutes}`;
	}
}

export default TaskManager;
