require('colors');

const { inquirerMenu, pause, readInput, deleteTaskList, confirmDelete, showCheckList } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/funcFile');
const Tasks = require('./models/tasks');

console.clear();

const main = async () => {
    let opt = '';

    const tasks = new Tasks();
    const tasksDB = readDB();

    if (tasksDB) {
        tasks.submitTasksFromArray(tasksDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1': // Create task option
                const desc = await readInput('Description: ');
                tasks.createTask(desc);
                break;
            case '2': // Show all task option
                tasks.fullList();
                break;
            case '3': // Show all completed task
                tasks.completedList(true);
                break;
            case '4': // Show all uncompleted task
                tasks.completedList(false);
                break;
            case '5': // Select task to check complete
                const ids = await showCheckList(tasks.listArr);
                tasks.toggleCompleted(ids);
                break;

            case '6': // Delete task option
                const id = await deleteTaskList(tasks.listArr);
                if (id !== '0') {
                    const confirm = await confirmDelete('Are you sure you want to delete?')
                    if (confirm) {
                        tasks.deleteTask(id);
                        console.log('Task deleted');
                    }
                }
                break;
        }

        saveDB(tasks.listArr);
        await pause();

    } while (opt !== '7');
};

main();