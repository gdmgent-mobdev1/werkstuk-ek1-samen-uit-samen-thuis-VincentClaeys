/* eslint-disable no-underscore-dangle */
import {
  getStorage, sRef, uploadBytesResumable, getDownloadURL,
} from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
// eslint-disable-next-line func-names
// eslint-disable-next-line no-unused-vars
let downloadURLVar;

class Tester {
  // eslint-disable-next-line class-methods-use-this
  uploadProcess() {
    let files = [];
    const input = document.createElement('input');
    input.type = 'file';
    const namebox = document.getElementById('imageBox');

    const reader = new FileReader();
    function getFileName(file) {
      const temp = file.name.split('.');
      const fname = temp.slice(0, -1).join('.');
      return fname;
    }

    input.onchange = (e) => {
      const name = getFileName(files[0]);
      files = e.target.files;

      namebox.value = name;

      reader.readAsDataURL(files[0]);
    };

    reader.readAsDataURL(files[0]);

    const imageToUpload = files[0];

    const imgName = namebox.value;

    const metaData = {
      contentType: imageToUpload.type,
    };

    const storage = getStorage();

    const storageRef = sRef(storage, `images/${imgName}`);

    const uploadTask = uploadBytesResumable(storageRef, imageToUpload, metaData);

    uploadTask.on(
      'state-change',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // eslint-disable-next-line no-console
        console.log(progress);
      },
      (error) => {
      // eslint-disable-next-line no-alert
        alert(`error: image not uploaded${error}`);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          downloadURLVar = downloadURL;
          // eslint-disable-next-line no-undef
          myImage.src = '';
        });
      },
    );
  }

  // eslint-disable-next-line class-methods-use-this
  addUser() {
    const firestore = getFirestore();
    const ref = collection(firestore, 'users');

    const docRef = addDoc(ref, {
      profileURL: downloadURLVar,
      userID: '',
    })
      .then(() => {
      // eslint-disable-next-line no-alert
        alert('record added');
        // eslint-disable-next-line no-console
        console.log(docRef);
      })
      .catch((error) => {
      // eslint-disable-next-line no-alert
        alert(`error${error}`);
      });
  }
}

export default Tester;
