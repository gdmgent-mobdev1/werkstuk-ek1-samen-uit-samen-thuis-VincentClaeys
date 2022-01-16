/* eslint-disable class-methods-use-this */
import {
  createUserWithEmailAndPassword,
  getAuth, signInWithEmailAndPassword, signOut,
  signInWithPopup, GoogleAuthProvider,

}
  from 'firebase/auth';
import Router from '../Router';

class Authenticator {
  /**
   * Register With Firebase
   */
  register() {
    const auth = getAuth();

    const email = document.getElementById('emailRegister').value;
    const pwd = document.getElementById('pwdRegister').value;

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

  /**
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
