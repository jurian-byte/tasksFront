import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

const ToDo = ({ todo, deleteToDo, updateToDo }) => {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.error("Invalid date:", dateString);
        return "Fecha no válida";
      }
      return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }).format(date);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Fecha no válida";
    }
  };

  const { title, description, state, priority, created_at, id } = todo;

  const cardBorderColor = state ? 'border-success' : 'border-warning';

  return (
    <div className="col-md-12">
      <div className={`card ${cardBorderColor} mb-3`}>
        <div className="card-header d-flex justify-content-between align-items-center">
          <div>
            <h5 className="card-title m-0">{title}</h5>
            <p className={`card-text`}>{state ? 'Completada' : 'Pendiente'}</p>
            <p className="card-text">
              <small className="text-muted">
                {formatDate(created_at)}
              </small>
            </p>
          </div>
          {priority && (
            <span className="badge bg-primary rounded-pill">
              Prioridad
            </span>
          )}
        </div>
        <div className="card-body d-flex justify-content-between align-items-center">
          <p className="card-text m-0">{description}</p>
          <div>
            {!state && (
              <button
                className="btn btn-outline-success btn-sm"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Marcar como completada"
                onClick={() => updateToDo({ ...todo, state: true })}
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
            )}
            <button className="btn btn-outline-danger btn-sm ms-2" onClick={() => deleteToDo(id)}>
              <FontAwesomeIcon icon={faTrash} title="Eliminar" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
