import React from 'react';
import ToDo from './ToDo';

const ToDos = ({ todos = [], deleteToDo, updateToDo }) => {
  return (
    <div>
      <h2 className="text-center">Tareas</h2>
      <div className="row">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <ToDo key={todo.id} todo={todo} deleteToDo={deleteToDo} updateToDo={updateToDo} />
          ))
        ) : (
          <p className="text-center">No hay tareas</p>
        )}
      </div>
    </div>
  );
};

export default ToDos;
