import React, { useContext } from 'react';
import AuthContext from '../../../store/auth-context';
import AuthForm from '../../Auth/AuthForm/AuthForm';
import LoggedInLayout from '../../Layout/LoggedInLayout/LoggedInLayout';
import Modal from '../../UI/Modal/Modal';

const User = ({ onCloseUserModal }) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.authorized;
  console.log(isLoggedIn);

  return (
    <Modal onClose={onCloseUserModal}>
      {isLoggedIn && <LoggedInLayout onCloseUserModal={onCloseUserModal} />}
      {!isLoggedIn && <AuthForm onCloseUserModal={onCloseUserModal} />}
    </Modal>
  );
};

export default User;
