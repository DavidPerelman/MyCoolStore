import { getAuth } from 'firebase/auth';
import React from 'react';
import AuthForm from '../../Auth/AuthForm/AuthForm';
import LoggedInLayout from '../../Layout/LoggedInLayout/LoggedInLayout';
import Modal from '../../UI/Modal/Modal';

const User = ({ onCloseUserModal }) => {
  const isLoggedIn = getAuth().currentUser;
  console.log(isLoggedIn);

  return (
    <Modal onClose={onCloseUserModal}>
      {isLoggedIn && <LoggedInLayout />}
      {!isLoggedIn && <AuthForm onCloseUserModal={onCloseUserModal} />}
    </Modal>
  );
};

export default User;
