import readline from 'node:readline';
import colorizeText from './colors.js';

export const showMenu = () => {
  return new Promise((resolve) => {
    console.clear();

    console.log(colorizeText('==========================', 'yellow'));
    console.log(colorizeText('   Select an option', 'yellow'));
    console.log(colorizeText('==========================', 'yellow'));
    console.log(`${colorizeText('1.', 'green')} Create a task`);
    console.log(`${colorizeText('2.', 'green')} List all tasks`);
    console.log(`${colorizeText('3.', 'green')} List completed tasks`);
    console.log(`${colorizeText('4.', 'green')} List pending tasks`);
    console.log(`${colorizeText('5.', 'green')} Complete task(s)`);
    console.log(`${colorizeText('6.', 'green')} Delete task(s)`);
    console.log(`${colorizeText('0.', 'green')} Exit \n`);
    console.log(colorizeText('==========================', 'yellow'));

    const IreadLine = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    IreadLine.question('Select an option  ', (answer) => {
      resolve(answer);
      IreadLine.close();
    });
  });
};

export const pause = () => {
  return new Promise((resolve) => {
    const IreadLine = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    IreadLine.question(`Press ${colorizeText('ENTER', 'yellow')} to continue ...`,
      () => {
        IreadLine.close();
        resolve();
      });
  });
};


