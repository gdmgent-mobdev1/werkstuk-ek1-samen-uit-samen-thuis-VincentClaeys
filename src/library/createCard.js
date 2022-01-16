/* eslint-disable no-underscore-dangle */
import { getFirestore, collection, getDocs } from 'firebase/firestore';

function vincentnt(userID, firstName, lastName, fileName, URLPath) {
  const ul = document.getElementById('list');
  const header = document.createElement('h2');
  const _userID = document.createElement('li');
  const _firstName = document.createElement('li');
  const _lastName = document.createElement('li');
  const _picture = document.createElement('img');
  const _fileName = document.createElement('li');
  const _URLPath = document.createElement('li');
  _picture.src = URLPath;

  _userID.innerHTML = `UserID : ${userID}`;

  _firstName.innerHTML = `Firstname : ${firstName}`;
  _lastName.innerHTML = `Lastname : ${lastName}`;
  // _picture.innerHTML = 'Picture : ' + fileName;
  _fileName.innerHTML = `filename : ${fileName}`;
  _URLPath.innerHTML = `URL Path : ${URLPath}`;

  ul.appendChild(header);
  ul.appendChild(_userID);
  ul.appendChild(_firstName);
  ul.appendChild(_lastName);
  ul.appendChild(_picture);
  ul.appendChild(_fileName);
  ul.appendChild(_URLPath);
}

class CreateCard {
  // eslint-disable-next-line class-methods-use-this

  // eslint-disable-next-line class-methods-use-this
  async fetchAllData() {
    const firestore = getFirestore();
    const querySnapshot = await getDocs(collection(firestore, 'users'));
    querySnapshot.forEach((doc) => {
      const { userID } = doc.data();
      const { firstName } = doc.data();
      const { lastName } = doc.data();
      const fileName = doc.data().imageFilename;
      const URLPath = doc.data().profileURL;
      vincentnt(userID, firstName, lastName, fileName, URLPath);
    });
  }
}
export default CreateCard;
