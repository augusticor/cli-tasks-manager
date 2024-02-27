import inquirer from 'inquirer';
import colorizeText from './colors.js';

const menuOptions = [
	{
		type: 'list',
		name: 'selectedOption',
		default: 0,
		message: 'Select an option',
		choices: [
			{
				name: `${colorizeText('1.', 'yellow')} Create a task`,
				value: 1,
			},
			{
				name: `${colorizeText('2.', 'yellow')} List all tasks`,
				value: 2,
			},
			{
				name: `${colorizeText('3.', 'yellow')} List completed tasks`,
				value: 3,
			},
			{
				name: `${colorizeText('4.', 'yellow')} List pending tasks`,
				value: 4,
			},
			{
				name: `${colorizeText('5.', 'yellow')} Complete task(s)`,
				value: 5,
			},
			{
				name: `${colorizeText('6.', 'yellow')} Delete a task`,
				value: 6,
			},
			{
				name: `${colorizeText('0.', 'yellow')} Exit`,
				value: 0,
			},
		],
	},
];

/**
 * Shows the main menu to the user
 * @returns { Number } the selected option
 */
const inquirerMenu = async () => {
	console.clear();

	//destructuracion, selected option es la property name de menuOptions
	const { selectedOption } = await inquirer.prompt(menuOptions);

	return selectedOption;
};

/**
 * Stops program execution until the user presses ENTER.
 */
const pauseMenu = async () => {
	console.log('\n');

	await inquirer.prompt([
		{
			name: 'pausing',
			message: `Press ${colorizeText('ENTER', 'yellow')} to continue ...`,
		},
	]);
};

/**
 * Reads the user input from the terminal
 * @param { String } messageToShow to the user
 */
const readUserInput = async (messageToShow) => {
	const question = [
		{
			type: 'input',
			name: 'userInput',
			message: colorizeText(messageToShow, 'yellow') + '\n - ',
			validate: function (input) {
				if (input.length === 0) {
					return `${colorizeText('Please enter a value', 'red')}`;
				}
				return true;
			},
		},
	];

	const { userInput } = await inquirer.prompt(question);
	return userInput;
};

/**
 * Shows all the tasks as answers for the inquirier menu, to delete them
 * @param { Array<> } tasksToShow the array of all the tasks, completed or not
 */
const showListOfTasksToDelete = async (tasksToShow = []) => {
	const choices = tasksToShow.map((eachTask, index) => {
		//Destructuring each task
		const { id, desc } = eachTask;

		const indexi = colorizeText(`${index + 1}.`, 'yellow');

		return {
			value: id,
			name: `${indexi} ${desc}`,
		};
	});

	choices.unshift({
		value: 0,
		name: colorizeText('0 to cancel', 'yellow'),
	});

	const question = [
		{
			type: 'list',
			name: 'selectedTaskID',
			message: 'Select tasks to delete',
			choices,
		},
	];

	const { selectedTaskID } = await inquirer.prompt(question);

	return selectedTaskID;
};

/**
 * Shows a confirmation message to the user
 * @param { String } message confirmation message
 */
const confirmMessage = async (message) => {
	const question = [
		{
			type: 'confirm',
			name: 'confirmation',
			message,
			default: true,
		},
	];

	const { confirmation } = await inquirer.prompt(question);
	return confirmation;
};

/**
 * Shows the list of only the pending tasks
 * @param { Array } pendingTasks
 */
const showListOfPendingTasks = async (pendingTasks = []) => {
	console.log();
	const choices = pendingTasks.map((pendTask, index) => {
		const { id, desc: description } = pendTask;

		const indexi = colorizeText(`${index + 1}.`, 'yellow');

		return {
			value: id,
			name: `${indexi} ${description}`,
		};
	});

	const questions = [
		{
			type: 'checkbox',
			name: 'selectedTasks',
			message: 'Select tasks to mark as complete',
			choices,
		},
	];

	const { selectedTasks } = await inquirer.prompt(questions);
	return selectedTasks;
};

export { confirmMessage, inquirerMenu, pauseMenu, readUserInput, showListOfPendingTasks, showListOfTasksToDelete };

