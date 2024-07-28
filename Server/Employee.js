const mongoose = require('mongoose')


const EmployeeSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    Contact: Number,
    Email: String,
    Age: Number,
    Address: String,
    Birthdate : Date,
})

const Employee = mongoose.model('employee', EmployeeSchema)

module.exports = Employee