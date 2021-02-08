const { readlink } = require('fs');

require('colors');

const showMenu = () => {
	return new Promise((resolve) => {
		console.clear();

		console.log('=========================='.yellow);
		console.log('  Select an option'.magenta);
		console.log('==========================\n'.yellow);
		console.log(`${'1.'.green} Create a task`);
		console.log(`${'2.'.green} List all tasks`);
		console.log(`${'3.'.green} List completed tasks`);
		console.log(`${'4.'.green} List pending tasks`);
		console.log(`${'5.'.green} Complete task(s)`);
		console.log(`${'6.'.green} Delete task(s)`);
		console.log(`${'0.'.green} Exit \n`);
		console.log('==========================\n'.yellow);

		const readLine = require('readline').createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		readLine.question('Select an option  ', (answer) => {
			resolve(answer);
			readLine.close();
		});
	});
};

const pause = () => {
	return new Promise((resolve) => {
		const readLine = require('readline').createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		readLine.question(`Press ${'ENTER'.yellow} to continue ...`, (answer) => {
			readLine.close();
			resolve();
		});
	});
};

module.exports = {
	showMenu,
	pause,
};
