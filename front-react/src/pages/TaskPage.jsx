import React, { useEffect } from 'react';
import { usePrivateAxios, useLoadingBar } from '../hooks';

import AddTask from '../components/AddTask';
import TaskGroup from '../components/TaskGroup';

const TaskPage = () => {
  const axios = usePrivateAxios();
  const [tasks, setTasks] = React.useState([]);
  const { setProgress } = useLoadingBar();

  useEffect(() => {
    setProgress(30);
    let isMounted = true;
    const controller = new AbortController();

    const getTasks = async () => {
      const url = '/todo/';
      try {
        const { data } = await axios.get(url, {
          signal: controller.signal,
        });

        isMounted && setTasks(data.todos);
        console.log('Tasks fetched');
        setProgress(80);
      } catch (error) {
        if (!isMounted) return;
        if (error?.response?.status === 403) {
          console.log('refresh token expired, logging out');
        } else {
          console.log(error);
        }
        //TODO: handle error
      }
      setProgress(100);
    };

    getTasks();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const completedTasks = tasks.filter((task) => task.completed === true);
  const incompleteTasks = tasks.filter((task) => task.completed === false);

  console.log(completedTasks, incompleteTasks);

  return (
    <div className='row h-100 justify-content-center flex-grow-1'>
      <div className='col-12 p-3'>
        <AddTask setTasks={setTasks} />
        {tasks.length !== 0 ? (
          <>
            <TaskGroup tasks={incompleteTasks} setTasks={setTasks} />
            <TaskGroup tasks={completedTasks} setTasks={setTasks} />
          </>
        ) : (
          <div className='row justify-content-center d-flex h-100 flex-column align-items-center mb-5'>
            <div className='col-12 text-center flex-grow-1 d-flex justify-content-center align-items-center flex-column gap-4 mb-5'>
              <div className='display-4 text-muted'>No Tasks to Show</div>
              <div className='display-6 text-muted mb-5'>
                Add tasks from above input
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskPage;
