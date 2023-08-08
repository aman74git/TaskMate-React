import React from 'react';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { usePrivateAxios, useLoadingBar } from '../hooks';

const TaskViewer = ({ task, setTasks }) => {
  const axios = usePrivateAxios();
  const { setProgress } = useLoadingBar();

  const onCheckboxChange = async () => {
    setProgress(30);
    const url = `/todo/update?id=${task._id}`;
    try {
      await axios.put(url, { completed: !task.completed });
      setProgress(80);

      setTasks((tasks) =>
        tasks.map((t) => {
          if (t._id === task._id) {
            return { ...t, completed: !t.completed };
          } else {
            return t;
          }
        })
      );
    } catch (err) {
      console.log(err);
      //TODO: HANDLE ERROR
    }
    setProgress(100);
  };

  return (
    <div className='row justify-content-center'>
      <div className='col-12'>
        <div className='card m-2 p-2 shadow border-0 rounded-3'>
          <div
            className={
              'card-body d-flex gap-3 justify-content-center flex-column-reverse'
            }
          >
            <div className='flex-shrink-0 d-flex align-items-center'>
              {task.completed ? (
                <i
                  className='bi bi-check2-circle fs-5 p-0'
                  role='button'
                  onClick={onCheckboxChange}
                />
              ) : (
                <i
                  className='bi bi-circle fs-5 p-0'
                  role='button'
                  onClick={onCheckboxChange}
                />
              )}
              <i
                className='bi bi-pencil-square fs-5 p-0 ms-2 text-primary'
                role='button'
                data-bs-toggle='modal'
                data-bs-target={'#staticBackdrop' + task._id}
              />
              <i
                className='bi bi-trash fs-5 p-0 ms-2 text-danger'
                role='button'
                data-bs-toggle='modal'
                data-bs-target={'#staticBackdrop-delete' + task._id}
              />
            </div>
            <div className='flex-grow-1'>{task.description}</div>
          </div>
        </div>
      </div>
      <EditModal task={task} setTasks={setTasks} />
      <DeleteModal task={task} setTasks={setTasks} />
    </div>
  );
};

export default TaskViewer;
