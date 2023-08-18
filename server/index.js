const express = require('express');
const dotenv = require("dotenv")
const cors = require('cors');
const pool = require('./db')


const app = express();

// middleware 
app.use(cors());
app.use(express.json());

// ROUTES 

// create a todo 
app.post('/todos', async (req, res) => {
    try {

        const description = req.body.description;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );

        res.status(201).json(newTodo.rows);

    } catch (error) {
        console.log(error.message)
        res.status(400).send('Unable to create a todo')
    }
});


// get all todos 
app.get('/todos', async (req, res) => {
    const todos = await pool.query(
        "select * from todo"
    );

    res.status(200).json(todos.rows)
});


// get a todo 
app.get('/todos/:id', async (req, res) => {
    const id = req.params.id
    try {
        // check if the todo exists 
        const check = await pool.query(
            "SELECT EXISTS (SELECT 1 FROM todo WHERE todo_id = $1)",
            [id]
        );
        if (!check.rows[0].exists) { return res.status(404).send("The ToDo is not available") }

        const todo = await pool.query(
            "select description from todo where todo_id = $1",
            [id]
        );
        res.status(200).json(todo.rows)

    } catch (error) {
        console.log(error.message)
        res.status(400).send(error.message)
        return
    }

});


// update a todo 
app.put('/todos/:id', async (req, res) => {
    const id = req.params.id
    const description = req.body.description
    try {
        // check if the todo exists 
        const check = await pool.query(
            "SELECT EXISTS (SELECT 1 FROM todo WHERE todo_id = $1)",
            [id]
        );
        if (!check.rows[0].exists) { return res.status(404).send("The ToDo is not available") }
        // if todo available 
        const todo = await pool.query(
            "update todo set description= $1 where todo_id = $2 returning *",
            [description, id]
        );
        res.status(200).json(todo.rows)

    } catch (error) {
        console.log(error.message)
        res.status(400).send(error.message)
        return
    }

});


// delete a todo 
app.delete('/todos/:id', async (req, res) => {
    const id = req.params.id
    try {
        // check if the todo exists 
        const check = await pool.query(
            "SELECT EXISTS (SELECT 1 FROM todo WHERE todo_id = $1)",
            [id]
        );
        if (!check.rows[0].exists) { return res.status(404).send("The ToDo is not available") }
        // if todo available 
        const todo = await pool.query(
            "DELETE FROM todo WHERE todo_id= $1 returning *",
            [id]
        );
        res.status(200).json(`The todo "${todo.rows[0].description}", is deleted successfully!`)

    } catch (error) {
        console.log(error.message)
        res.status(400).send(error.message)
        return
    }

});


// PORT 
const port = process.env.PORT || 8000
app.listen(port, () => { console.log(`Your server is listening at ${port}`) })