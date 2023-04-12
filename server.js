const express = require("express");
const mongoose = require("mongoose");
const employee = require('./models/employee');
const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/employee', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

var app = express();    
app.use(bodyParser.json())

// Get route to get all employee data from MongoDB
app.get('/', function (req, res) {
    employee.find({})
    .then(data => {
        return JSON.stringify(data)
    })
    .then(text => res.send(text))
})

// Post route to save data in MongoDB
app.post('/create', function (req, res) {
    const e = new employee(req.body);
    e.save()
    .then(data => JSON.stringify(data))
    .then(text => res.send(text));
});

// Patch route to update employee data in MongoDB. Filtered by name.
app.patch('/update', function (req, res) {
    employee.updateOne({name: req.body.name}, req.body)
    .then(data => JSON.stringify(data))
    .then(text => res.send(`employee details is updated with name ${req.body.name}`));
});

// Delete route to delete employee data from MongoDB. filtered by name
app.delete('/delete', async function (req, res) {
    try {
        
        await employee.deleteOne({name: req.body.name})
        res.send(`employee with name ${req.body.name} is deleted`)
    } catch (error) {
        throw error
    };
});

app.listen("8080", ()=>{
    console.log(`Example app listening on port 8080!`)
})