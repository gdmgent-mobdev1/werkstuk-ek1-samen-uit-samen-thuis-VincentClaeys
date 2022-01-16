/**
 *dashboard Component
 */

/* eslint-disable class-methods-use-this */

import Component from '../library/Component';
import Elements from '../library/Elements';
import logo from '../images/logo.png';
import Router from '../Router';
import Authenticator from '../library/Authenticator';
import Crud from '../library/Crud';
import CreateCard from '../library/createCard';

class EventsComponent extends Component {
  constructor() {
    super({
      name: 'events',
      routerPath: '/events',
    });
  }

  render() {
    this.clearComponent();

    const EventsContainer = document.createElement('div');

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
      textContent: 'Events',
      className: 'dashboardContainer__sloganOne',
    });
    const textContainerTwo = Elements.createText({
      textContent: 'Check hier al jouw events! ',
      className: 'dashboardContainer__text',

    });

    // inputifelds
    const inputUserId = Elements.createInput({
      type: 'text',
      id: 'userID',
      placeholder: 'userID',
    });
    const firstnameInput = Elements.createInput({
      type: 'text',
      id: 'firstName',
      placeholder: 'firstName',
    });
    const lastNameInput = Elements.createInput({
      type: 'text',
      id: 'lastName',
      placeholder: 'lastName',
    });

    const createEventBtn = Elements.createButton({
      textContent: 'CreateFirestore',
      id: 'CreateFirestore',
      onClick: () => {
        const auth = new Crud();
        auth.addUser();
      },
    });
    const deleteEventBtn = Elements.createButton({
      textContent: 'DeleteFirestore',
      id: 'DeleteFirestore',
    });
    const laatOnsHopen = Elements.createButton({
      textContent: 'laatOnsHopen',
      id: 'laatOnsHopen',
      onClick: () => {
        const komop = new CreateCard();
        komop.fetchAllData();
      },
    });

    const createdEvents = Elements.createList({
      id: 'list',
      className: 'dashboardContaine__list',

    });
    // wrapper Two
    const homePageWrapperTwo = Elements.createContainer({
      className: 'dashboardContainer',
      children: [headerContainerTwo,
        textContainerTwo, inputUserId, firstnameInput, lastNameInput,
        createEventBtn, deleteEventBtn, laatOnsHopen, createdEvents],

    });

    // combine two wrappers
    const createContainer = Elements.createContainer({
      className: 'togheter',
      children: [homePageWrapperOne, homePageWrapperTwo],
    });

    EventsContainer.appendChild(createContainer);
    return EventsContainer;
  }
}
export default EventsComponent;
