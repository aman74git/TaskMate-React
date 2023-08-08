import React, { useState, useEffect } from 'react';
import { usePrivateAxios, useLoadingBar } from '../hooks';
import './bootstrapOverride.css';

const AddTask = ({ setTasks }) => {
  const [newTask, setNewTask] = useState('');
  const [disabled, setDisabled] = useState(true);
  const axios = usePrivateAxios();
  const { setProgress } = useLoadingBar();

  useEffect(() => {
    if (newTask.length > 2) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [newTask]);

  const onAddTask = async (e) => {
    setProgress(30);
    e.preventDefault();
    console.log('New Task: ', newTask);
    setNewTask('');

    try {
      const url = '/todo/create';
      const body = { description: newTask, completed: false };
      const response = await axios.post(url, body);
      setProgress(80);
      const id = response.data.id;
      const newAddedTask = { ...body, _id: id };
      console.log(newAddedTask);

      setTasks((prev) => [...prev, newAddedTask]);
    } catch (error) {
      console.log('error in adding task', error);
    }
    setProgress(100);
  };

  return (
    <div className='row justify-content-center m-3'>
      <div className='col-12 col-lg-8'>
        <form onSubmit={onAddTask}>
          <div className='d-flex gap-4'>
            <div className='flex-grow-1'>
              <input
                type='text'
                className='form-control'
                id='add-task'
                placeholder='Enter New Task'
                autoComplete='off'
                autoFocus={true}
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </div>
            <div className='flex-grow-0'>
              <button
                type='submit'
                className='btn btn-dark text-nowrap'
                disabled={disabled}
              >
                Add Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
