/* eslint-disable no-console */
/* eslint-disable no-alert */
/**
 *dashboard Component
 */

/* eslint-disable class-methods-use-this */

import {
  doc,
  setDoc,
  getFirestore,
} from 'firebase/firestore';
import {
  getStorage, ref as sRef, uploadBytesResumable, getDownloadURL,
} from 'firebase/storage';
import Component from '../library/Component';
import Elements from '../library/Elements';
import logo from '../images/logo.png';
import Router from '../Router';
import Authenticator from '../library/Authenticator';

class UploadPhotosComponent extends Component {
  constructor() {
    super({
      name: 'uploadPhoto',
      routerPath: '/uploadPhoto',
    });
  }

  render() {
    this.clearComponent();

    const uploadPhotosContainer = document.createElement('div');

    // content wrapper One
    const header = Elements.createImage({
      newSource: logo,
      className: 'dashboard__logo',
      onClick: () => {
        Router.getRouter().navigate('/dashboard');
      },
    });

    const logOutBtn = Elements.createButton({
      className: 'dashboard__btnLogOut',
      textContent: 'Log out',
      onClick: () => {
        const auth = new Authenticator();
        auth.logOut();
      },
    });

    // wrapper One
    const homePageWrapperOne = Elements.createContainer({
      className: 'dashboard',
      children: [header, logOutBtn],
    });

    // content wrapper Two
    const headerContainerTwo = Elements.createHeader({
      textContent: 'Create Event',
      className: 'dashboardContainer__sloganOne',
    });
    const textContainerTwo = Elements.createText({
      textContent: 'and have a party to remember',
      className: 'dashboardContainer__text',

    });

    /**
       * UPLOAD IMAGE
       */
    let downloadURLVar; let
      fileNameVar;
    let files = [];
    const reader = new FileReader();
    const firestore = getFirestore();
    const createtext = Elements.createInput({
      id: 'username',
      input: 'type',
    });
    const createInputFile = Elements.createInput({
      id: 'imgName',
      type: 'file',
    });
    const createUploadBtn = Elements.createButton({
      id: 'upBtn',
      textContent: 'upload',
    });

    function getFileName(file) {
      const temp = file.name.split('.');
      return temp;
    }
    createInputFile.onchange = (e) => {
      files = e.target.files;
      console.log(files);
      fileNameVar = getFileName(files[0]);
      console.log(fileNameVar);
      reader.readAsDataURL(files[0]);
      console.log(reader);
    };
    function addUser() {
      const firstNameVar = document.getElementById('username').value;
      const ref = doc(firestore, 'users', firstNameVar);

      setDoc(ref, {
        firstName: firstNameVar,
        profileURL: downloadURLVar,

      })

        .then(() => {
          alert('record added');
        })
        .catch((error) => {
          alert(`error${error}`);
        });
    }

    async function uploadProcess() {
      const imageToUpload = files[0];

      const metaData = {

        contentType: imageToUpload.type,

      };

      const storage = getStorage();
      const storageRef = sRef(storage, `images/${fileNameVar}`);
      const uploadTask = uploadBytesResumable(storageRef, imageToUpload, metaData);

      uploadTask.on(
        'state-change',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        // progLab.innerHTML = "Upload " + progress + "%";
        },
        (error) => {
          alert(`error: image not uploaded${error}`);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            downloadURLVar = downloadURL;
            addUser();
          });
        },

      );
    }

    createUploadBtn.onclick = uploadProcess;

    /**
 * WRAPPER TWO
 */
    const homePageWrapperTwo = Elements.createContainer({
      className: 'dashboardContainer',
      children: [headerContainerTwo,
        textContainerTwo],

    });

    // combine two wrappers
    const createContainer = Elements.createContainer({
      className: 'togheter',
      children: [homePageWrapperOne, homePageWrapperTwo, createtext, createInputFile,
        createUploadBtn],
    });

    uploadPhotosContainer.appendChild(createContainer);
    return uploadPhotosContainer;
  }
}
export default UploadPhotosComponent;
