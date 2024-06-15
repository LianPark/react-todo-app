import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get('http://localhost/todo-api/get-tasks.php')
      .then(response => {
        console.log(response.data);
        setTasks(response.data)
      })
      .catch(error => console.error(error));
  }, []);

  const addTask = () => {
    if (!newTask) return;

    const d = new Date();
    const today = new Date(d.getTime()).toISOString().split(".")[0].replace(/T/, ' ');

    axios.post('http://localhost/todo-api/add-task.php', 
        { 
          task: newTask,
          datetime: today
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .then(response => {
        console.log('response.data:', response.data);
        setTasks([response.data, ...tasks]);
        setNewTask('');
      })
      .catch(error => console.error(error));
  };

  const deleteTask = (id) => {
    axios.post('http://localhost/todo-api/delete-task.php', { id }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <div className='container'>
      <div className='todo-head'>
        <h1>To Do List</h1>
        <input
          type="text"
          value={newTask}
          onChange={e => {setNewTask(e.target.value)}}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='todo-body'>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>할일</th>
              <th>생성시간</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task,index) => (
                <tr key={task.id}>
                  <td>{index+1}</td>
                  <td>{task.task}</td>
                  <td>{task.create_at}</td>
                  <td><button onClick={() => deleteTask(task.id)}>Delete</button></td>        
                </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default ToDo;
