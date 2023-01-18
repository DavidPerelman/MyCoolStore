import React, { useContext } from 'react';
import AuthContext from '../../../store/auth-context';
import Button from '../../UI/Button/Button';
import classes from './Logout.module.css';

const Logout = ({ userData, onLogout }) => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={classes.logout}>
      <h2>{/* Hello {userData.firstName} {userData.lastName}! */}</h2>
      <Button
        className={classes.button}
        background='#540d83'
        color='white'
        onClick={authCtx.logout}
      >
        Logout
      </Button>
    </div>
  );
};

export default Logout;
