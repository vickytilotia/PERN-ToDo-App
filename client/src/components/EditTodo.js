import React, { Fragment, useState, useEffect } from 'react'

function EditTodo({ todo }) {

    const [description, setDescription] = useState(todo.description);

    // edit description 
    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch(`http://localhost:8000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (err) {
            console.error(err.message)
        }
    }

    return <Fragment>

        <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
            Edit
        </button>


        <div className="modal fade" id={`id${todo.todo_id}`} onClick={e => setDescription(todo.description)} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={e => setDescription(todo.description)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <input type="text" classNameName="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
                        <button type="button" className="btn btn-warning" onClick={e => updateDescription(e)}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>;
}

export default EditTodo
