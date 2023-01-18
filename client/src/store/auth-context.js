import React, { createContext, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import axios from 'axios';

const AuthContext = createContext({
  userModalIsShown: false,
  showUserModal: () => {},
  hideUserModal: () => {},
  token: '',
  isLoggedIn: false,
  currentUser: null,
  signup: (email, password) => {},
  login: (email, password) => {},
  logout: () => {},
  clearError: () => {},
});

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [userModalIsShown, setUserModalIsShown] = useState(false);
  const [error, setError] = useState(null);
  const usersCollectionRef = collection(db, 'users');

  const onShowUserModal = () => {
    setUserModalIsShown(true);
  };

  const onHideUserModal = () => {
    setUserModalIsShown(false);
  };

  const clearError = () => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const checkLoggedIn = async () => {
    const unSubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          setCurrentUser(authenticatedUser);
        } else {
          setCurrentUser(null);
        }
      }
    );

    return unSubscribeAuth;
  };

  const signup = async (username, email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        await updateProfile(auth.currentUser, { displayName: username });
        await addDoc(usersCollectionRef, {
          uid: user.user.uid,
          email: email,
          username: username,
          role: 'customer',
        });

        await axios.post('/api/auth/createUser', {
          uid: user.user.uid,
          email: email,
          userName: username,
        });

        setCurrentUser({
          displayName: user.user.displayName,
          email: user.user.email,
          uid: user.user.uid,
        });

        setCurrentUser(user);
      })
      .catch((err) => {
        setError('Signup error!');
        clearError();
      });
  };

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        setCurrentUser({
          displayName: user.user.displayName,
          email: user.user.email,
          uid: user.user.uid,
        });

        setCurrentUser(user);
        onHideUserModal();
      })
      .catch((err) => {
        setError('Login error!');
        onShowUserModal();
        clearError();
      });
  };

  const logout = async () => {
    return getAuth().signOut();
  };

  const contextValue = {
    userModalIsShown: userModalIsShown,
    showUserModal: onShowUserModal,
    hideUserModal: onHideUserModal,
    checkLoggedIn: checkLoggedIn,
    signup: signup,
    currentUser: currentUser,
    error: error,
    login: login,
    logout: logout,
    clearError: clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
