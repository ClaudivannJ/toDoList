import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoListPage from './pages/TodoListPage';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route exact path="/" element={<TodoListPage/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
