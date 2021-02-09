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
}

module.exports = TaskManager;
