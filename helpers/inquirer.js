const inquirer = require('inquirer');
const Tasks = require('../models/tasks');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'Waht do you want to do?',
        choices: [
            {
                value: '1',
                name: `${'1.'.blue} Create a task`
            },
            {
                value: '2',
                name: `${'2.'.blue} List all tasks`
            },
            {
                value: '3',
                name: `${'3.'.blue} List completed task`
            },
            {
                value: '4',
                name: `${'4.'.blue} List pending task`
            },
            {
                value: '5',
                name: `${'5.'.blue} Complete task(s)`
            },
            {
                value: '6',
                name: `${'6.'.blue} Delete task`
            },
            {
                value: '7',
                name: `${'7.'.blue} Exit`
            }
        ]
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log('======================================'.green);
    console.log('           Select an option           '.white);
    console.log('======================================\n'.green);

    const { option } = await inquirer.prompt(questions);

    return option;
}

const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.blue} to continue`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question)
};

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message, // -> message: message
            validate(value) {
                if (value.length === 0) {
                    return 'Please, write something a value'
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const deleteTaskList = async (tasks = []) => {
    
    const choices = tasks.map((task, i) => {
        return {
            value: task.id,
            name: `${((i + 1) + '.').green} ${task.desc}`
        }
    })

    choices.unshift({
        value: '0',
        name: `${('0.').green} Cancel`
    })
    
    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices //choices: choices
        }
    ]

    const {id} = await inquirer.prompt(questions);
    return id;
}

const confirmDelete = async (message) => {
    const question = {
        type: 'confirm',
        name: 'ok',
        message
    }

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const showCheckList = async (tasks = []) => {
    
    const choices = tasks.map((task, i) => {
        return {
            value: task.id,
            name: `${((i + 1) + '.').green} ${task.desc}`,
            checked: (task.dateComplete) ? true : false
        }
    })
   
    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selections',
            choices //choices: choices
        }
    ]

    const {ids} = await inquirer.prompt(question);
    return ids;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    deleteTaskList,
    confirmDelete,
    showCheckList
}