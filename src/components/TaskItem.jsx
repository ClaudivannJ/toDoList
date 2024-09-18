import React, { useState } from 'react';

function TaskItem({ task, onEdit, onDelete, onStatusChange, onViewHistory }) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="task-item">
      <div className="task-info">
        <h3>{task.title}</h3>
        <p>Vencimento: {task.due_date}</p>
      </div>
      <div className="task-status">
        <button
          className={`status-btn ${task.status}`}
          onClick={() => task.status !== 'concluído' && onStatusChange(task.id)}
        >
          {task.status}
        </button>
      </div>

      <div className="task-actions">
        {showActions && (
          <>
            <button onClick={() => onEdit(task)}>Editar</button>
            <button onClick={() => onDelete(task.id)}>Excluir</button>
            {task.history && task.history.length > 0 && (
              <button onClick={() => onViewHistory(task.id)}>Ver Histórico</button>
            )}
          </>
        )}
        <button onClick={() => setShowActions(!showActions)}>
          {showActions ? 'Esconder' : 'Mostrar'} Ações
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
