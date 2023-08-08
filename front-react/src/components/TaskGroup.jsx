import React from 'react';
import TaskViewer from './TaskViewer';

const TaskGroup = ({ tasks, setTasks }) => {
  return (
    <div className='row justify-content-center mt-5 mb-4'>
      <div className='col-12 col-lg-10'>
        {tasks?.length > 0
          ? tasks.map((task) => (
              <TaskViewer key={task._id} task={task} setTasks={setTasks} />
            ))
          : ''}
      </div>
    </div>
  );
};

export default TaskGroup;
