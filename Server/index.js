const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Employee = require('./Employee');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://harsh:harshsheladiya@atlascluster.ggroc8n.mongodb.net/employeegrid", {
   
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // JavaScript months are 0-indexed
};

app.post('/addemployee', (req, res) => {
    if (req.body.Birthdate) {
        req.body.Birthdate = parseDate(req.body.Birthdate);
    }
    Employee.create(req.body)
    .then(employee => res.status(201).json(employee))
    .catch(err => res.status(400).json(err));
});

app.get('/getemployee', (req, res) => {
    Employee.find({})
    .then(employee => {
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json(employee);
    })
    .catch(err => res.status(400).json(err));

});

app.get('/', (req,res) => {
    res.send('welcome to project 1')
})

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3001");
});
