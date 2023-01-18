import React, { useEffect, useState } from 'react';
import Input from '../../UI/Input/Input';
import classes from './Register.module.css';

const Register = ({
  goToLogin,
  enteredRegisterFirstName,
  enteredRegisterLastName,
  enteredRegisterEmail,
  enteredRegisterPassword,
  enteredRegisterConfirmPassword,
  setEnteredFirstName,
  setEnteredLastName,
  setEnteredEmail,
  setEnteredPassword,
  setEnteredConfirmPassword,
  setFormIsValid,
}) => {
  const [firstNameIsValid, setFirstNameIsValid] = useState('');
  const [lastNameIsValid, setLastNameIsValid] = useState('');
  const [emailIsValid, setEmailIsValid] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState('');
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState('');

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checkin form validaty');
      setFormIsValid(
        enteredRegisterFirstName.trim().length > 0 &&
          enteredRegisterLastName.trim().length > 0 &&
          enteredRegisterEmail.includes('@') &&
          enteredRegisterPassword.trim().length > 6 &&
          enteredRegisterConfirmPassword.trim().length > 6 &&
          enteredRegisterConfirmPassword === enteredRegisterPassword
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [
    enteredRegisterFirstName,
    enteredRegisterLastName,
    enteredRegisterEmail,
    enteredRegisterPassword,
  ]);

  const firstNameChangeHandler = (e) => {
    setEnteredFirstName(e.target.value);
  };

  const lastNameChangeHandler = (e) => {
    setEnteredLastName(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const confirmPasswordChangeHandler = (e) => {
    setEnteredConfirmPassword(e.target.value);
  };

  const validateFirstNameHandler = () => {
    setFirstNameIsValid(enteredRegisterFirstName.trim().length > 0);
  };

  const validateLastNameHandler = () => {
    setLastNameIsValid(enteredRegisterLastName.trim().length > 0);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredRegisterEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(
      enteredRegisterPassword.trim().length > 6 &&
        enteredRegisterPassword === enteredRegisterConfirmPassword
    );
  };

  const validateConfirmPasswordHandler = () => {
    setConfirmPasswordIsValid(
      enteredRegisterConfirmPassword.trim().length > 6 &&
        enteredRegisterPassword === enteredRegisterConfirmPassword
    );
  };

  return (
    <div className={classes.register}>
      <h2>Register</h2>
      <Input
        id='firstname'
        label='First Name'
        type='text'
        onChange={firstNameChangeHandler}
        onBlur={validateFirstNameHandler}
        isValid={firstNameIsValid}
      />
      <Input
        id='lastname'
        label='Last Name'
        type='text'
        onChange={lastNameChangeHandler}
        onBlur={validateLastNameHandler}
        isValid={lastNameIsValid}
      />
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
      <Input
        id='confirm-password'
        label='Confirm Password'
        type='password'
        onChange={confirmPasswordChangeHandler}
        onBlur={validateConfirmPasswordHandler}
        isValid={confirmPasswordIsValid}
      />
      <p>
        If you already have an account?
        <span onClick={goToLogin} className={classes['have-acount-span']}>
          {' '}
          Login
        </span>
        .
      </p>
    </div>
  );
};

export default Register;
