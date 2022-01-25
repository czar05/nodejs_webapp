const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user:{
        type : String
    },
    task:{
        type: String
    },
    status:{
        type: String
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;