import React, { useState } from 'react';

function AddTaskModal({ task, onSave, onClose }) {
  const [title, setTitle] = useState(task ? task.title : '');
  const [dueDate, setDueDate] = useState(task ? task.due_date : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      title,
      due_date: dueDate,
    };
    onSave(newTask);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{task ? 'Editar Tarefa' : 'Cadastrar Tarefa'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome da Tarefa:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Data de Vencimento:
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </label>
          <button type="submit">{task ? 'Editar Tarefa' : 'Cadastrar Tarefa'}</button>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;
