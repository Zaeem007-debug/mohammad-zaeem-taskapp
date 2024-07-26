import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import classes from "./AddTask.module.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AddTask = () => {
    const [description, setDescription] = useState('');
    const [radioValue, setRadioValue] = useState('2');
    const [tasks, setTasks] = useState(() => {
      const storedTasks = JSON.parse(localStorage.getItem('tasks'));
      return storedTasks || [];
    });
    const navigate = useNavigate();

    const radios = [
      { name: 'Completed', value: '1' },
      { name: 'Incomplete', value: '2' }
    ];

  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newTask = {
        description,
        completed: radioValue === '1',
        time: new Date().toLocaleString()
      };
      const updatedTasks = [...tasks, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setDescription('');
      setRadioValue('2');
      navigate('/');
    };
  
    return (
      <main className={classes.content}>
        <Form onSubmit={handleSubmit}>
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? 'outline-danger' : 'outline-success'}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
            <br />
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              placeholder='Please enter task description'
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <div className="footer">
              <Button type="submit">Add Task</Button>
              <Link to="/">
                <Button  style={{ marginLeft: '10px' }} variant="secondary">Back</Button>
              </Link>
            </div>
        </Form>
      </main>
    );
  }

export default AddTask;
  