const inquirer = require('inquirer');
require('colors');

const menuOptions = [
	{
		type: 'list',
		name: 'selectedOption',
		default: 0,
		message: 'Select an option',
		choices: [
			{
				name: `${'1.'.yellow} Create a task`,
				value: 1,
			},
			{
				name: `${'2.'.yellow} List all tasks`,
				value: 2,
			},
			{
				name: `${'3.'.yellow} List completed tasks`,
				value: 3,
			},
			{
				name: `${'4.'.yellow} List pending tasks`,
				value: 4,
			},
			{
				name: `${'5.'.yellow} Complete task(s)`,
				value: 5,
			},
			{
				name: `${'6.'.yellow} Delete task(s)`,
				value: 6,
			},
			{
				name: `${'0.'.yellow} Exit`,
				value: 0,
			},
		],
	},
];

const inquirerMenu = async () => {
	console.clear();

	//destructuracion, selected option es la property name de menuOptions
	const { selectedOption } = await inquirer.prompt(menuOptions);

	return selectedOption;
};

const pauseMenu = async () => {
	console.log('\n');

	await inquirer.prompt([
		{
			name: 'pausing',
			message: `Press ${'ENTER'.yellow} to continue ...`,
		},
	]);
};

const readUserInput = async (messageToShow) => {
	const question = [
		{
			type: 'input',
			name: 'userInput',
			message: messageToShow.yellow + '\n - ',
			validate: function (input) {
				if (input.length === 0) {
					return `${'Please write a task description !!'.red}`;
				}
				return true;
			},
		},
	];

	const { userInput } = await inquirer.prompt(question);
	return userInput;
};

module.exports = {
	inquirerMenu,
	pauseMenu,
	readUserInput,
};
