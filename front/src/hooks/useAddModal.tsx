import { useState } from 'react';

const useAddModal = () => {
  const [show, setShow] = useState(false);
  

  const openAddModal = () => {
    setShow(true);
  };

  const closeAddModal = () => {
    setShow(false);
  };

  const AddModal = ({ children }) => {
    if (!show) return null;
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'gray',
            opacity: '0.5',
          }}
        ></div>
        <div style={{ position: 'relative' }}>{children}</div>
      </div>
    );
  };

  return { AddModal, openAddModal, closeAddModal };
};

export default useAddModal;
