import React, { useEffect, useState } from 'react';
import Task from './Task';

const Home = () => {
  const initialArray = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  const [tasks, setTasks] = useState(initialArray);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    setTasks([...tasks, { title, description, completed: false }]);
    setTitle('');
    setDescription('');
  };

  const deleteTask = (index) => {
    const filteredArray = tasks.filter((_, i) => i !== index);
    setTasks(filteredArray);
  };

  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const updateTask = (index, updatedTitle, updatedDescription) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, title: updatedTitle, description: updatedDescription } : task
    );
    setTasks(updatedTasks);
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className='container'>
      <h2>DAILY GOALS</h2>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type='submit'>ADD</button>
      </form>
      {tasks.map((item, index) => (
        <Task
          key={index}
          title={item.title}
          description={item.description}
          completed={item.completed}
          deleteTask={() => deleteTask(index)}
          toggleCompletion={() => toggleCompletion(index)}
          updateTask={(updatedTitle, updatedDescription) =>
            updateTask(index, updatedTitle, updatedDescription)
          }
        />
      ))}
    </div>
  );
};

export default Home;
