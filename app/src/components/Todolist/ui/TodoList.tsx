'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Todo, FilterType } from '../types/todo';
import  styles from "./todoList.module.css"

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    
    setTodos([...todos, {
      id: uuidv4(),
      text,
      completed: false
    }]);
    setInput('');
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => 
    filter === 'active' ? !todo.completed :
    filter === 'completed' ? todo.completed : true
  );

  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo list</h1>
      
      <div className={styles.inputContainer}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Что нужно сделать?"
          className={styles.input}
        />
        <button 
          onClick={addTodo} 
          disabled={!input.trim()}
          className={styles.addButton}
        >
          Добавить
        </button>
      </div>

      <div className={styles.filters}>
        {(['all', 'active', 'completed'] as FilterType[]).map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`${styles.filterButton} ${filter === type ? styles.active : ''}`}
          >
            {type === 'all' && 'Все'}
            {type === 'active' && 'Активные'}
            {type === 'completed' && 'Выполненные'}
          </button>
        ))}
      </div>

      <div className={styles.todoList}>
        {filteredTodos.map(todo => (
          <div key={todo.id} className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className={styles.checkbox}
            />
            <span className={styles.todoText}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} className={styles.deleteButton}>
              ✕
            </button>
          </div>
        ))}
      </div>

      {!filteredTodos.length && (
        <div className={styles.emptyState}>
          {todos.length ? 'Задачи не найдены' : 'Пока задач нет'}
        </div>
      )}

      {todos.length > 0 && (
        <div className={styles.stats}>
          <span>Осталось задач: {activeCount}</span>
          <button 
            onClick={clearCompleted} 
            disabled={!todos.some(todo => todo.completed)}
            className={styles.clearButton}
          >
            Удалить выполненные
          </button>
        </div>
      )}
    </div>
  );
}