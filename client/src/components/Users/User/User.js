import { getAuth } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../store/auth-context';
import AuthForm from '../../Auth/AuthForm/AuthForm';
import LoggedInLayout from '../../Layout/LoggedInLayout/LoggedInLayout';
import Modal from '../../UI/Modal/Modal';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import Register from '../Register/Register';
import classes from './User.module.css';

const User = ({ onCloseUserModal, setUserStatusIsShown }) => {
  const authCtx = useContext(AuthContext);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(authCtx);

  const isLoggedIn = getAuth().currentUser;
  console.log(isLoggedIn);
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [isRegisterPage, setIsRegisterPage] = useState(false);
  const [userData, setUserData] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);

  const [enteredLoginEmail, setEnteredLoginEmail] = useState('');
  const [enteredLoginPassword, setEnteredLoginPassword] = useState('');

  const [enteredRegisterFirstName, setEnteredRegisterFirstName] = useState('');
  const [enteredRegisterLastName, setEnteredRegisterLastName] = useState('');
  const [enteredRegisterEmail, setEnteredRegisterEmail] = useState('');
  const [enteredRegisterPassword, setEnteredRegisterPassword] = useState('');
  const [enteredRegisterConfirmPassword, setEnteredRegisterConfirmPassword] =
    useState('');

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    if (storedUserLoggedInInformation === '1') {
      setUserData({
        firstName: 'David',
        lastName: 'Perelman',
      });

      setIsLoginPage(false);
      setIsRegisterPage(false);
      // setIsLoggedIn(true);
    }
  }, []);

  return (
    <Modal onClose={onCloseUserModal}>
      {isLoggedIn && <LoggedInLayout />}
      {!isLoggedIn && <AuthForm onCloseUserModal={onCloseUserModal} />}

      {/* {isLoginPage && (
        <>
          <Login
            goToRegister={goToRegister}
            enteredLoginEmail={enteredLoginEmail}
            enteredLoginPassword={enteredLoginPassword}
            setEnteredEmail={setEnteredLoginEmail}
            setEnteredPassword={setEnteredLoginPassword}
            setFormIsValid={setFormIsValid}
          />
        </>
      )}
      {isRegisterPage && (
        <>
          <Register
            goToLogin={goToLogin}
            enteredRegisterFirstName={enteredRegisterFirstName}
            enteredRegisterLastName={enteredRegisterLastName}
            enteredRegisterEmail={enteredRegisterEmail}
            enteredRegisterPassword={enteredRegisterPassword}
            enteredRegisterConfirmPassword={enteredRegisterConfirmPassword}
            setEnteredFirstName={setEnteredRegisterFirstName}
            setEnteredLastName={setEnteredRegisterLastName}
            setEnteredEmail={setEnteredRegisterEmail}
            setEnteredPassword={setEnteredRegisterPassword}
            setEnteredConfirmPassword={setEnteredRegisterConfirmPassword}
            setFormIsValid={setFormIsValid}
          />
        </>
      )}
      {isLoggedIn && (
        <>
          <Logout userData={userData} onLogout={onLogoutHandler} />
        </>
      )}
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={onCloseUserModal}>
          Close
        </button>
        {isLoginPage && (
          <form className={classes['login-form']} onSubmit={onLoginHandler}>
            <button className={classes.button} disabled={!formIsValid}>
              Login
            </button>
          </form>
        )}
        {isRegisterPage && (
          <form
            className={classes['register-form']}
            onSubmit={onRegisterHandler}
          >
            <button
              className={classes.button}
              type='submit'
              disabled={!formIsValid}
            >
              Register
            </button>
          </form>
        )}
      </div> */}
    </Modal>
  );
};

export default User;
