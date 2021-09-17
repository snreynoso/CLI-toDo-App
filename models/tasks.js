const Task = require("./task");

class Tasks {
    _list = {};

    get listArr() {
        const list = [];
        Object.keys(this._list).forEach(key => {
            const task = this._list[key];
            list.push(task);
        });
        return list;
    }

    constructor() {
        this._list = {};
    }

    deleteTask(id = '') {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    createTask(desc = '') {
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    submitTasksFromArray(tasks = []) {
        tasks.forEach(task => {
            this._list[task.id] = task;
        });
    }

    fullList() {
        console.log();

        this.listArr.forEach((task, i) => {
            if (task.dateComplete) {
                console.log(`${((i + 1) + '.').green} ${task.desc} :: ${'Complete'.green}`);
            } else {
                console.log(`${((i + 1) + '.').red} ${task.desc} :: ${'Pending'.red}`);
            }
        });
    }

    completedList(completed = true) {
        console.log();
        let index = 0;

        this.listArr.forEach(task => {

            if (completed && task.dateComplete) {
                index++;
                console.log(`${((index) + '.').green} ${task.desc} :: ${task.dateComplete.green}`);
            } else if (!completed && !task.dateComplete) {
                index++;
                console.log(`${((index) + '.').red} ${task.desc} :: ${'Pending'.red}`);
            }
        });
    }

    toggleCompleted(ids = []) {
        ids.forEach(id => {
            const task = this._list[id];
            if (!task.dateComplete) {
                task.dateComplete = new Date().toISOString(); 
            } 
        });

        this.listArr.forEach( task => {
            if(!ids.includes(task.id)) { 
                this._list[task.id].dateComplete = null;
            }
        });
    }
}

module.exports = Tasks;