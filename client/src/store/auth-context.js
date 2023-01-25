import React, { createContext, useEffect, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, db } from '../firebase';
// import { addDoc, collection } from 'firebase/firestore';
import axios from 'axios';
import { checkUserAuthorized, createToken, createUser } from '../api/usersApi';

const AuthContext = createContext({
  userModalIsShown: false,
  showUserModal: () => {},
  hideUserModal: () => {},
  token: '',
  isLoggedIn: false,
  authorized: false,
  currentUser: null,
  signup: (email, password) => {},
  login: (email, password) => {},
  logout: () => {},
  // checkUserIsAuthorized: () => {},
  clearError: () => {},
});

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [userModalIsShown, setUserModalIsShown] = useState(false);
  const [error, setError] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  // const usersCollectionRef = collection(db, 'users');

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

  // const checkLoggedIn = async () => {
  //   const unSubscribeAuth = onAuthStateChanged(
  //     auth,
  //     async (authenticatedUser) => {
  //       if (authenticatedUser) {
  //         console.log(authenticatedUser);
  //         setCurrentUser(authenticatedUser);
  //       } else {
  //         setCurrentUser(null);
  //       }
  //     }
  //   );
  // };

  const signup = async (username, email, password) => {
    const mongoUser = await createUser(username, email, password);
    console.log(mongoUser);
    if (mongoUser) {
      await createUserWithEmailAndPassword(
        auth,
        mongoUser.user.email,
        mongoUser.user.password
      )
        .then(async (user) => {
          await updateProfile(auth.currentUser, { displayName: username });

          setCurrentUser({
            displayName: user.user.displayName,
            email: user.user.email,
            uid: user.user.uid,
          });
        })
        .catch((err) => {
          setError('Signup error!');
          clearError();
        });

      localStorage.setItem('token', mongoUser.token);

      setCurrentUser(mongoUser);
    }
  };

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        setCurrentUser({
          displayName: user.user.displayName,
          email: user.user.email,
          uid: user.user.uid,
        });

        const token = await createToken(user.uid, password);
        console.log(token);
        localStorage.setItem('token', token.token);
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
    localStorage.removeItem('token');
    return getAuth().signOut();
  };

  const firebaseLogin = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        setAuthorized(true);
        console.log(user.user.accessToken);
        localStorage.setItem('token', user.user.accessToken);
      }
    } catch (err) {
      console.log(err);
      setError('Invalid email address or password.');
      clearError();
    }
  };

  // const getUser = async () => {
  //   try {
  //     setLoadingUser(true);
  //     // const token = await auth.currentUser.getIdToken();
  //     const bearer_token = `Bearer ${localStorage.getItem('token')}`;

  //     // const token = auth.currentUser
  //     //   .getIdToken()
  //     //   .then((data) => console.log(data));

  //     const data = await checkUserAuthorized(bearer_token);
  //     console.log(auth.currentUser);
  //     if (data.data) {
  //       setAuthorized(true);
  //       setCurrentUser(data.data);
  //       setLoadingUser(false);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    const authStateListener = () => {
      auth.onAuthStateChanged(async (user) => {
        if (!user) {
          setLoading(false);
          return setAuthorized(false);
        }

        setLoading(false);
        setCurrentUser(user);
        return setAuthorized(true);
      });
    };

    authStateListener();
    // checkLoggedIn();
  }, [authorized]);

  const contextValue = {
    userModalIsShown: userModalIsShown,
    showUserModal: onShowUserModal,
    hideUserModal: onHideUserModal,
    // checkLoggedIn: checkLoggedIn,
    signup: signup,
    currentUser: currentUser,
    error: error,
    authorized: authorized,
    login: firebaseLogin,
    logout: logout,
    clearError: clearError,
    // checkUserIsAuthorized: getUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
