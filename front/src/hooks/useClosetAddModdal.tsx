import { useState } from 'react';

const useClosetAddModal = () => {
  const [showClosetModal, setshowClosetModal] = useState(false);

  const openClosetAddModal = () => {
    setshowClosetModal(true);

  };

  const closeClosetAddModal = () => {
    setshowClosetModal(false);
  };

  const ClosetAddModal = ({ children }) => {
    if (!showClosetModal) return null;
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

  return { ClosetAddModal, openClosetAddModal, closeClosetAddModal };
};

export default useClosetAddModal;