import React, { useEffect } from 'react'
import { useState } from 'react';
import Task  from './Task';
const Home = () => {
    const initialArray = localStorage.getItem('tasks')?JSON.parse(localStorage.getItem('tasks')):[];
   const[tasks,settasks] = useState(initialArray);
   const[title,settitle] = useState("")
   const[description,setdescription] = useState("")
//   console.log(title,description) 
const submithandler = (e) => {
    e.preventDefault();

    settasks([...tasks , {title,description}]);
    settitle(""); 
    setdescription("");
}
const deleteTask = (index)=>{
    const filteredarr = tasks.filter((val,i) => {
        return i !== index;
    });
    console.log(filteredarr);
    settasks(filteredarr);
}

useEffect(() => {
    localStorage.setItem("tasks",JSON.stringify(tasks));
}, [tasks])

  return (
    <div className='container'>
        <h2>DAILY GOALS</h2>
    <form onSubmit={submithandler}>
        <input type="text" placeholder='Title' onChange={(e) => settitle(e.target.value)} />
        <textarea placeholder='Description' onChange={(e) => setdescription(e.target.value)}></textarea>
        <button type='submit' onSubmit={submithandler}>ADD</button>
    </form>
        {tasks.map((item ,index)=>(
        <Task key={index} title={item.title} description={item.description} deleteTask={deleteTask} index={index}/>
    ))}
    </div>
  )   
}

export default Home
