import React, { useEffect, useState } from 'react';
import Input from '../../UI/Input/Input';
import classes from './Login.module.css';

const Login = ({
  goToRegister,
  enteredLoginEmail,
  enteredLoginPassword,
  setEnteredEmail,
  setEnteredPassword,
  setFormIsValid,
}) => {
  const [passwordIsValid, setPasswordIsValid] = useState('');
  const [emailIsValid, setEmailIsValid] = useState('');

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checkin form validaty');
      setFormIsValid(
        enteredLoginEmail.includes('@') &&
          enteredLoginPassword.trim().length > 6
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [enteredLoginEmail, enteredLoginPassword]);

  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredLoginEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredLoginPassword.trim().length > 6);
  };

  return (
    <div className={classes.login}>
      <h2>Login</h2>
      <form className={classes['login-form']}>
        <Input
          id='email'
          label='E-Mail'
          type='email'
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          isValid={emailIsValid}
        />
        <Input
          id='password'
          label='Password'
          type='password'
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          isValid={passwordIsValid}
        />
      </form>
      <p>
        Don't have an account?
        <span onClick={goToRegister} className={classes['have-acount-span']}>
          {' '}
          Sign Up
        </span>
        .
      </p>
    </div>
  );
};

export default Login;
