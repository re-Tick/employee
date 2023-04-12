const mongoose = require("mongoose");

const employee = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    contact: Number,
    skillSet: [String],
    joiningDate: String,
    status: Boolean, // Currently employed or not
})

const user = mongoose.model('employee', employee);
module.exports = user;