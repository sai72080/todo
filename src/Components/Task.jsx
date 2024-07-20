import React, { useState } from 'react';

const Task = ({ title, description, completed, deleteTask, toggleCompletion, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTask(updatedTitle, updatedDescription);
    setIsEditing(false);
  };

  return (
    <div className={`task ${completed ? 'completed' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type='text'
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          ></textarea>
          <button type='submit'>Save</button>
        </form>
      ) : (
        <div>
          <p>{title}</p>
          <span>{description}</span>
        </div>
      )}
      <button onClick={toggleCompletion}>{completed ? 'Undo' : 'Complete'}</button>
      <button onClick={deleteTask}>Delete</button>
      <button onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Cancel' : 'Edit'}</button>
    </div>
  );
};

export default Task;
