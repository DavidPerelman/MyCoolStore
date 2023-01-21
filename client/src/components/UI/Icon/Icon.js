import classes from './Icon.module.css';

const Icon = ({ type, count, amount, onClick, isLoggedIn, size }) => {
  return (
    <h4>
      <div className={classes.cart} onClick={onClick}>
        {count && <span className={classes.count}>{amount}</span>}
        <i
          className={`fas ${type} fa-${size || 'lg'} ${classes.headerIcon} ${
            type === 'fa-user' && isLoggedIn !== null ? classes.isLogin : ''
          }`}
        ></i>
      </div>
    </h4>
  );
};

export default Icon;
