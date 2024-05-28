import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';

const Formulario = ({ addToDo }) => {
  const form = useRef(null);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    state: '',
    priority: false
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!todo.title.trim()) {
      newErrors.title = "El título es necesario.";
      isValid = false;
    }
    if (!todo.description.trim()) {
      newErrors.description = "La descripción no puede estar vacía.";
      isValid = false;
    }
    if (!todo.state) {
      newErrors.state = "Debe seleccionar un estado.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newTask = {
        title: todo.title,
        description: todo.description,
        state: todo.state === 'completada',
        priority: todo.priority,
        created_at: new Date().toISOString()
      };

      addToDo(newTask)
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Tarea agregada correctamente.",
            showConfirmButton: false,
            timer: 1500
          });

          form.current.reset();

          setTodo({
            title: "",
            description: "",
            state: '',
            priority: false
          });

          setErrors({});
        })
        .catch((error) => {
          console.error('Error al agregar la tarea:', error);
        });
    }
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setTodo({
      ...todo,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <form ref={form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Ingrese nueva tarea"
        className={`form-control mb-2 ${errors.title ? 'is-invalid' : ''}`}
        value={todo.title}
        onChange={handleChange}
      />
      {errors.title && <div className="invalid-feedback">{errors.title}</div>}

      <textarea
        name="description"
        placeholder="Ingrese descripción"
        className={`form-control mb-2 ${errors.description ? 'is-invalid' : ''}`}
        value={todo.description}
        onChange={handleChange}
      ></textarea>
      {errors.description && <div className="invalid-feedback">{errors.description}</div>}

      <div className="form-check mb-2">
        <input
          type="checkbox"
          name="priority"
          className="form-check-input"
          id="inputCheck"
          checked={todo.priority}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="inputCheck">Dar prioridad</label>
      </div>

      <select
        className={`form-select mb-2 ${errors.state ? 'is-invalid' : ''}`}
        name="state"
        value={todo.state}
        onChange={handleChange}
      >
        <option value="" disabled hidden>Seleccione un estado</option>
        <option value="pendiente">Pendiente</option>
        <option value="completada">Completada</option>
      </select>
      {errors.state && <div className="invalid-feedback">{errors.state}</div>}

      <button className="btn btn-primary " type="submit">Agregar</button>
    </form>
  );
};

export default Formulario;
