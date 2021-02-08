const Task = require('./task');

class TaskManager {
	constructor() {
		this._list = {};
	}

	createTask(desc) {
		const task = new Task(desc);

		this._list[task.id] = task;
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
