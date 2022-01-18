import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

function ineenfunctie() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
      const { password } = user;
      console.log(password);
    // ...
    } else {
    // User is signed out
    // ...
    }
  });
}

export default ineenfunctie;
