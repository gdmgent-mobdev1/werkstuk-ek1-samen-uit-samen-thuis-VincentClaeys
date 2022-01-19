/**
 *registerPage Component
 */

/* eslint-disable class-methods-use-this */

import Component from '../library/Component';
import Elements from '../library/Elements';
import photoOne from '../images/backgroundImages2.png';
import logo from '../images/logo.png';
import Authenticator from '../library/Authenticator';
import Router from '../Router';

class ReigsterPageTwoComponent extends Component {
  constructor() {
    super({
      name: 'registerTwo',
      routerPath: '/registerTwo',
    });
  }

  render() {
    this.clearComponent();
    // content wrapper One
    const registerPageTwoContainer = document.createElement('div');
    const header = Elements.createImage({
      newSource: logo,
      className: 'header__logo',
    });

    const firstImage = Elements.createImage({
      newSource: photoOne,
      className: 'header__photo',
    });

    // wrapper One
    const homePageWrapperOne = Elements.createContainer({
      className: 'header',
      children: [header, firstImage],
    });

    // content wrapper Two
    const headerContainerTwo = Elements.createHeader({
      textContent: 'Register',
      className: 'welcomeBackContainer__sloganOne',
      id: 'test',
    });

    // inputfield one

    const inputFieldThree = Elements.createInputField({
      className: 'welcomeBackContainer__wrapperFields--inputfieldTwo',
      type: 'text',
      // text: 'password',
      placeholder: 'Last Name',
      id: 'firstNameRegister',
    });
    const inputFieldFour = Elements.createInputField({
      className: 'welcomeBackContainer__wrapperFields--inputfieldTwo',
      type: 'text',
      // text: 'password',
      placeholder: 'First Name',
      id: 'lastNameRegister',
    });
    const inputFieldFive = Elements.createInputField({
      className: 'welcomeBackContainer__wrapperFields--inputfieldTwo',
      type: 'text',
      // text: 'password',
      placeholder: 'username',
      id: 'usernameRegister',
    });

    // Login button
    const loginButton = Elements.createButton({
      className: 'welcomeBackContainer__btnLogin',
      textContent: 'Register!',
      onClick: () => {
        const test = new Authenticator();
        test.updateUsername();
        Router.getRouter().navigate('/');
      },

    });

    // btn Register

    // wrapper inputfields
    const wrapperInputFields = Elements.createContainer({
      className: 'welcomeBackContainer__wrapperFields',
      children: [inputFieldFour, inputFieldThree, inputFieldFive],
    });

    // wrapper Two
    const homePageWrapperTwo = Elements.createContainer({
      className: 'welcomeBackContainer',
      children: [headerContainerTwo, wrapperInputFields, loginButton,
      ],

    });

    // combine two wrappers
    const createContainer = Elements.createContainer({
      className: 'togheter',
      children: [homePageWrapperOne, homePageWrapperTwo],
    });

    registerPageTwoContainer.appendChild(createContainer);
    return registerPageTwoContainer;
  }
}
export default ReigsterPageTwoComponent;
