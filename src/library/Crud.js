import { getFirestore, doc, setDoc } from 'firebase/firestore';

class Crud {
  // eslint-disable-next-line class-methods-use-this
  addUser() {
    const firestore = getFirestore();
    const userIDVar = document.getElementById('userID').value;
    const firstNameVar = document.getElementById('firstName').value;
    const lastNameVar = document.getElementById('lastName').value;

    const ref = doc(firestore, 'users', userIDVar);

    setDoc(ref, {
      userID: userIDVar,
      firstName: firstNameVar,
      lastName: lastNameVar,
      // profileURL: downloadURLVar,
      // imageFilename: namebox.value + ',' + extLab.innerHTML
    })
      .then(() => {
        // eslint-disable-next-line no-alert
        alert('record added');
      })
      .catch((error) => {
        // eslint-disable-next-line no-alert
        alert(`error${error}`);
      });

    const h = document.createElement('H1'); // Create a <h1> element
    const t = document.createTextNode('Hello World'); // Create a text node
    h.appendChild(t);
  }
}
export default Crud;
