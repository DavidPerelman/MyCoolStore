import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import classes from './MyNavbar.module.css';
import Icon from '../../UI/Icon/Icon';
import { useState } from 'react';
import Hamburger from '../../UI/Hamburger/Hamburger';

const MyNavbar = () => {
  const [showLinks, setShowLinks] = useState(true);

  return (
    <div className={classes.MyNavbar}>
      <div className={classes['left-side']}>
        {/* <h3>MyCoolStore</h3> */}
        <div className={classes.links} id={showLinks ? classes['hidden'] : ''}>
          <Link>Home</Link>
          <Link>Feedback</Link>
          <Link>About Us</Link>
          <Link>Contact</Link>
        </div>
        <div className={classes.Hamburger}>
          <Hamburger showLinks={showLinks} setShowLinks={setShowLinks} />
        </div>
        {/* <i className='fas fa-bars'></i> */}
        {/* <button onClick={() => setShowLinks(!showLinks)}>Open</button> */}
      </div>
      <div className={classes['right-side']}>
        <input type='text' placeholder='Search...' />
        <button>Search</button>
      </div>
    </div>
  );
};

export default MyNavbar;
