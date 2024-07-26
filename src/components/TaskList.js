import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from "./AddTask.module.css";
import { Button, ListGroup } from 'react-bootstrap';

function TaskList () {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    return storedTasks || [];
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const updateTaskStatus = (index, completed) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed } : task
    );
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((task, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <main className={classes.content}>
      <div>
        <header>
          <h1>My Task List</h1>
          <Link to="/addTask">
            <Button variant="primary">Add New Task</Button>
          </Link>
        </header>
        <br/>
        <ListGroup>
          {tasks.map((task, index) => (
            <ListGroup.Item key={index}>
              <div>
                <strong>{task.description}</strong>
                <br />
                <span>{task.time}</span>
                <br />
                <span>Status: {task.completed ? 'Complete' : 'Incomplete'}</span>
                <br />
                <Button
                  onClick={() => updateTaskStatus(index, !task.completed)}
                  variant={task.completed ? 'danger' : 'success'}
                >
                  Mark as {task.completed ? 'Incomplete' : 'Complete'}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteTask(index)}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </main>
  )
}

export default TaskList