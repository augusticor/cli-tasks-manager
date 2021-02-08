const Task = require('./task');

class TaskManager {
	constructor() {
		this._listado = {};
	}

	createTask(desc) {
		const task = new Task(desc);

		this._listado[task.id] = task;
	}

	listAllTasks() {}
}

module.exports = TaskManager;
