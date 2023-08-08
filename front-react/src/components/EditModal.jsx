import React from 'react';
import { usePrivateAxios, useLoadingBar } from '../hooks';

const EditModal = ({ task, setTasks }) => {
  const [editValue, setEditValue] = React.useState(task.description);
  const axios = usePrivateAxios();
  const { setProgress } = useLoadingBar();

  const saveEdit = async () => {
    if (editValue.length <= 1) {
      setEditValue(task.description);
      return;
    }
    setProgress(30);
    try {
      const url = `/todo/update?id=${task._id}`;
      await axios.put(url, { description: editValue });
      setProgress(80);
      setTasks((tasks) =>
        tasks.map((t) => {
          if (t._id === task._id) {
            return { ...t, description: editValue };
          } else {
            return t;
          }
        })
      );
    } catch (error) {
      console.log(error);
      setEditValue(task.description);
    }
    setProgress(100);
  };

  const onCancelled = () => {
    setEditValue(task.description);
  };

  return (
    <>
      <div
        className='modal fade'
        id={'staticBackdrop' + task._id}
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
        autoFocus={false}
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='staticBackdropLabel'>
                Edit Task
              </h1>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveEdit();
              }}
            >
              <div className='modal-body'>
                <label htmlFor='edit-task' className='form-label'>
                  Description:
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='edit-task'
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                  onClick={onCancelled}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='btn btn-dark'
                  data-bs-dismiss='modal'
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
