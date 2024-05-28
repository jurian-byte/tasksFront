import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Formulario from './assets/components/Formulario';
import ToDos from './assets/components/ToDos';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://intense-sea-98447-35625ece3196.herokuapp.com/tasks');
        setTodos(response.data || []);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const addToDo = async (todo) => {
    try {
      const response = await axios.post('https://intense-sea-98447-35625ece3196.herokuapp.com/tasks', todo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const deleteToDo = (id) => {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta tarea?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Cancelar',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://intense-sea-98447-35625ece3196.herokuapp.com/tasks/${id}`)
          .then(() => {
            const newToDos = todos.filter((todo) => todo.id !== id);
            setTodos(newToDos);
            Swal.fire('¡Eliminado!', '', 'success');
          })
          .catch((error) => {
            console.error('Error al eliminar la tarea:', error);
            Swal.fire('Error al eliminar la tarea', '', 'error');
          });
      } else if (result.isDenied) {
        Swal.fire('La tarea no ha sido eliminada', '', 'info');
      }
    });
  };

  const updateToDo = (todo) => {
    axios.put(`https://intense-sea-98447-35625ece3196.herokuapp.com/tasks/${todo.id}`, todo)
      .then((response) => {
        const newToDos = todos.map((t) => (t.id === todo.id ? response.data : t));
        setTodos(newToDos);
      })
      .catch((error) => {
        console.error('Error al actualizar la tarea:', error);
        Swal.fire('Error al actualizar la tarea', '', 'error');
      });
  };

  return (
    <div className="container">
      <h1 className="my-5 text-center">Agregar tarea</h1>
      <Formulario addToDo={addToDo} />
      <ToDos todos={todos} deleteToDo={deleteToDo} updateToDo={updateToDo} />
    </div>
  );
};

export default App;
