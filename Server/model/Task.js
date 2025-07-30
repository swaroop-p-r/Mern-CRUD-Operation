const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, required: true, default: false },
}, { timestamps: true })

const Task = mongoose.model('task', taskSchema);

module.exports = Task;