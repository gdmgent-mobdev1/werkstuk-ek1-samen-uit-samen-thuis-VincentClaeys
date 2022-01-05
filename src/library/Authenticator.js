/* eslint-disable class-methods-use-this */
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// class Authenticator {
//   register() {
//     createUserWithEmailAndPassword();
//   }
// }
class Authenticator {
  register() {
    createUserWithEmailAndPassword();
  }
}

// logica
// onclick () => {
// const auth = new Authenticator();
// auth.register();
// };

export default Authenticator;
