import React from 'react';
import { usePrivateAxios, useLoadingBar } from '../hooks';

const DeleteModal = ({ task, setTasks }) => {
  const axios = usePrivateAxios();
  const { setProgress } = useLoadingBar();

  const onDelete = async () => {
    setProgress(30);
    try {
      const url = `/todo/remove?id=${task._id}`;
      await axios.delete(url);
      setProgress(80);

      setTasks((tasks) => tasks.filter((t) => t._id !== task._id));
    } catch (error) {
      console.log(error);
      // TODO: add error handling
    }
    setProgress(100);
  };

  return (
    <>
      <div
        className='modal fade'
        id={'staticBackdrop-delete' + task._id}
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
                Are You sure to Delete?
              </h1>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onDelete();
              }}
            >
              <input
                type='text'
                defaultValue='are you sure to delete'
                className='form-control d-none'
              />
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='btn btn-danger'
                  data-bs-dismiss='modal'
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
