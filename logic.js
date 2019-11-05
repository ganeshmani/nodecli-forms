const inquirer = require('inquirer');

const initFunc = questions => {
  return inquirer.prompt(questions);
};

module.exports = initFunc;
