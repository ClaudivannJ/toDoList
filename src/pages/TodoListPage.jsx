import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from '../components/TaskList';
import AddTaskModal from '../components/AddTaskModal';
import HistoryModal from '../components/HistoryModal'; // Novo componente

function TodoListPage() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [filter, setFilter] = useState('due_date');
  const [showHistoryModal, setShowHistoryModal] = useState(false); // Estado para histórico
  const [taskHistory, setTaskHistory] = useState([]); // Estado para armazenar o histórico

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://192.168.11.16:3001/api/tasks');
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Erro ao buscar tarefas', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const openModal = (task = null) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setCurrentTask(null);
    setShowModal(false);
  };

  const handleSaveTask = async (task) => {
    try {
      if (currentTask) {
        await axios.put(`http://192.168.11.16:3001/api/tasks/${currentTask.id}`, task);
      } else {
        await axios.post('http://192.168.11.16:3001/api/tasks', task);
      }
      fetchTasks();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar tarefa', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://192.168.11.16:3001/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Erro ao excluir tarefa', error);
    }
  };

  const handleStatusChange = async (taskId) => {
    try {
      await axios.patch(`http://192.168.11.16:3001/api/tasks/${taskId}/status`, { status: 'concluído' });
      fetchTasks();
    } catch (error) {
      console.error('Erro ao alterar status da tarefa', error);
    }
  };

  const handleViewHistory = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && task.history) {
      setTaskHistory(task.history);
      setShowHistoryModal(true);
    }
  };

  const closeHistoryModal = () => {
    setShowHistoryModal(false);
    setTaskHistory([]);
  };

  return (
    <div className="todo-list-page">
      <header>
        <h1>Minha Lista de Tarefas</h1>
        <div className="task-controls">
          <input
            type="text"
            placeholder="Pesquisar tarefa..."
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase();
              const filteredTasks = tasks.filter(task =>
                task.title.toLowerCase().includes(searchTerm) || task.due_date.includes(searchTerm)
              );
              setTasks(filteredTasks);
            }}
          />
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="due_date">Ordenar por Data de Vencimento</option>
            <option value="created_at">Ordenar por Data de Criação</option>
          </select>
        </div>
      </header>

      <main>
        {tasks.length > 0 ? (
          <TaskList
            tasks={tasks}
            onEdit={openModal}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            onViewHistory={handleViewHistory}
          />
        ) : (
          <p className="no-tasks">Você ainda não tem uma tarefa.</p>
        )}
      </main>

      <button className="add-task-btn" onClick={() => openModal()}>Adicionar Tarefa</button>

      {showModal && (
        <AddTaskModal
          task={currentTask}
          onSave={handleSaveTask}
          onClose={closeModal}
        />
      )}

      {showHistoryModal && (
        <HistoryModal
          history={taskHistory}
          onClose={closeHistoryModal}
        />
      )}
    </div>
  );
}

export default TodoListPage;
