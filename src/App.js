

import React, { useState } from 'react';
import './App.css'; // Создайте этот файл для стилей

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue,
          completed: false
        }
      ]);
      setInputValue('');
    }
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">📋 Мой Todo-лист</h1>
        
        <div className="input-section">
          <input
            type="text"
            className="todo-input"
            placeholder="Введите новую задачу..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="add-button" onClick={handleAddTodo}>
            Добавить
          </button>
        </div>

        <div className="todos-list">
          {todos.length === 0 ? (
            <p className="empty-message">Список дел пуст. Добавьте первую задачу!</p>
          ) : (
            todos.map(todo => (
              <div key={todo.id} className="todo-item">
                <div className="todo-content">
                  <input
                    type="checkbox"
                    className="todo-checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                  />
                  <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                    {todo.text}
                  </span>
                </div>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteTodo(todo.id)}
                  aria-label="Удалить задачу"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {todos.length > 0 && (
          <div className="stats">
            <span>Всего задач: {todos.length}</span>
            <span>Выполнено: {todos.filter(t => t.completed).length}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
