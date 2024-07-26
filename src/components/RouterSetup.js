import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import TaskList from './TaskList';
import AddTask from './AddTask';
import NotFound from './NotFound';

function RouterSetup() {
    return (
      <Routes>
        <Route exact path="/" element={<TaskList/>} />
        <Route path="/addTask" element={<AddTask/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
}

export default RouterSetup;