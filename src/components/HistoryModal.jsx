import React from 'react';

function HistoryModal({ history, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Histórico de Edições</h2>
        {history.length > 0 ? (
          <ul>
            {history.map((entry, index) => (
              <li key={index}>
                <p><strong>Título:</strong> {entry.title}</p>
                <p><strong>Data de Vencimento:</strong> {entry.due_date}</p>
                <p><strong>Editado em:</strong> {new Date(entry.edited_at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Essa tarefa ainda não foi editada.</p>
        )}
      </div>
    </div>
  );
}

export default HistoryModal;
