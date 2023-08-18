import React, { Fragment, useState, useEffect } from 'react';

// components 
import EditTodo from './EditTodo';

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    // delete a todo
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:8000/todos/${id}`, {
                method: "DELETE"
            });

            // its a filter condition 
            // show all todos other then this id i.e. deleted todo id 
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (err) {
            console.error(err.message)
        }
    }


    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:8000/todos");
            const jsonData = await response.json();
            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    return <Fragment>
        <table className="table mt-5 text-center">
            <thead>
                <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>

                {todos.map(todo => (
                    <tr key={todo.todo_id}>
                        <td>{todo.description}</td>
                        <td>
                            <EditTodo todo={todo} />
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Fragment>;
}

export default ListTodos;
