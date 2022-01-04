/**
 *HomePage Component
 */

/* eslint-disable class-methods-use-this */

import Component from '../library/Component';
import Elements from '../library/Elements';
import photoOne from '../images/backgroundImages2.png';
import logo from '../images/logo.png';

class HomePageComponent extends Component {
  constructor() {
    super({
      name: 'home',
      routerPath: '/',
    });
  }

  render() {
    // content wrapper One
    const HomepageContainer = document.createElement('div');
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
      textContent: 'Welcome',
      className: 'welcomeBackContainer__sloganOne',
    });
    const textContainerTwo = Elements.createText({
      textContent: "Don't have an account yet? ",
      className: 'welcomeBackContainer__text',
    });
    // inputfield one
    const inputFieldOne = Elements.createInputField({
      className: 'welcomeBackContainer__wrapperFields--inputfieldOne',
      type: 'email',
      placeholder: 'username',
    });

    // inputfield Two

    const inputFieldTwo = Elements.createInputField({
      className: 'welcomeBackContainer__wrapperFields--inputfieldTwo',
      type: 'password',
      text: 'password',
      placeholder: 'password',
    });

    // Login button
    const loginButton = Elements.createButton({
      className: 'welcomeBackContainer__btnLogin',
      textContent: 'Login',
    });
    // facebook button
    const loginButtonFacebook = Elements.createButton({
      className: 'welcomeBackContainer__btnFacebook',
      textContent: 'f',
    });

    // google button
    const loginButtonGoogle = Elements.createButton({
      className: 'welcomeBackContainer__btnGoogle',
      textContent: 'G',
    });

    // btn Register
    const registerButton = Elements.createButton({
      className: 'welcomeBackContainer__btnRegister',
      textContent: 'Register here',
    });

    // wrapper inputfields
    const wrapperInputFields = Elements.createContainer({
      className: 'welcomeBackContainer__wrapperFields',
      children: [inputFieldOne, inputFieldTwo],
    });

    // wrapper Two
    const homePageWrapperTwo = Elements.createContainer({
      className: 'welcomeBackContainer',
      children: [headerContainerTwo, wrapperInputFields, loginButton,
        loginButtonFacebook, loginButtonGoogle, textContainerTwo, registerButton],

    });

    // combine two wrappers
    const createContainer = Elements.createContainer({
      className: 'togheter',
      children: [homePageWrapperOne, homePageWrapperTwo],
    });

    HomepageContainer.appendChild(createContainer);
    return HomepageContainer;
  }
}
export default HomePageComponent;
