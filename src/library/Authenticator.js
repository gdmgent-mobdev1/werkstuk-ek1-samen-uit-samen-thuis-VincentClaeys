/* eslint-disable class-methods-use-this */
import {
  createUserWithEmailAndPassword,
  getAuth, signInWithEmailAndPassword, signOut,
  signInWithPopup, GoogleAuthProvider, onAuthStateChanged,

}
  from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import Router from '../Router';

class Authenticator {
  /**
   * Register With Firebase
   */
  register() {
    const auth = getAuth();
    const firestore = getFirestore();

    const email = document.getElementById('emailRegister').value;
    const pwd = document.getElementById('pwdRegister').value;
    const username = document.getElementById('usernameRegister').value;
    const ref = doc(firestore, 'AllUsers', email);
    setDoc(ref, {
      Email: email,
      passWord: pwd,
      Username: username,

      // profileURL: downloadURLVar,
      // imageFilename: namebox.value + ',' + extLab.innerHTML
    });

    createUserWithEmailAndPassword(auth, email, pwd)
      .then((userCredential) => {
        // signed in
        const users = userCredential;
        // eslint-disable-next-line no-console
        console.log(users);
      })
      .then(() => {
        Router.getRouter().navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // eslint-disable-next-line no-alert
        alert(`Error ${errorCode}${errorMessage}`);
      });
  }

  /**
 * Login with Email and Password
 */
  login() {
    const auth = getAuth();

    const email = document.getElementById('email').value;
    const pwd = document.getElementById('pwd').value;

    signInWithEmailAndPassword(auth, email, pwd)
      .then((userCredential) => {
        // eslint-disable-next-line no-console
        console.log(userCredential);
        // signed in
        // eslint-disable-next-line no-alert
        alert('logged In');
      })
      .then(() => {
        Router.getRouter().navigate('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // eslint-disable-next-line no-alert
        alert(`Error ${errorCode}${errorMessage}`);
      });
  }

  ineenfunctie() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
        const { email } = user;
        console.log(email);
      // ...
      }
      // User is signed out
      // ...
    });
  } /**
   * Login with Google
   */

  loginWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    // signInWithRedirect(auth, provider);
    signInWithPopup(auth, provider)

      .then(() => {
        Router.getRouter().navigate('/dashboard');
      });
  }

  /**
   * Log out
   */

  logOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      // eslint-disable-next-line no-alert
      Router.getRouter().navigate('/');
    })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // eslint-disable-next-line no-alert
        alert(`Error ${errorCode}${errorMessage}`);
      });
  }
}

// const auth = new Authenticator();
// auth.register();

export default Authenticator;
