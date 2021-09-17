const { v4: uuidv4 } = require('uuid');

class Task {
    id = '';
    desc = '';
    dateComplete = null;

    constructor(desc) {
        this.id = uuidv4();
        this.desc = desc;
        this.dateComplete = null;
    }
}

module.exports = Task;