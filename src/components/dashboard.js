/**
 *dashboard Component
 */

/* eslint-disable class-methods-use-this */

import Component from '../library/Component';
import Elements from '../library/Elements';
import logo from '../images/logo.png';

class DashboardComponent extends Component {
  constructor() {
    super({
      name: 'dashboard',
      routerPath: '/dashboard',
    });
  }

  render() {
    // content wrapper One

    const dashboardContainer = document.createElement('div');
    const header = Elements.createImage({
      newSource: logo,
      className: 'dashboard__logo',
    });

    const logOutBtn = Elements.createButton({
      className: 'dashboard__btnLogOut',
      textContent: 'Log out',
    });

    // wrapper One
    const homePageWrapperOne = Elements.createContainer({
      className: 'dashboard',
      children: [header, logOutBtn],
    });

    // content wrapper Two
    const headerContainerTwo = Elements.createHeader({
      textContent: 'Hello,',
      className: 'dashboardContainer__sloganOne',
    });
    const textContainerTwo = Elements.createText({
      textContent: 'Nice to have you back! ',
      className: 'dashboardContainer__text',
    });

    // wrapper Two
    const homePageWrapperTwo = Elements.createContainer({
      className: 'dashboardContainer',
      children: [headerContainerTwo,
        textContainerTwo],

    });

    // content for the containers

    const contentForContainerEvents = Elements.createButton({
      textContent: ' VIEW EVENTS',
      className: 'AllContainers__divOne--text',

    });

    const icon = Elements.createIcon({ classNames: ['fas', 'fa-street-view', 'input-icon'] });

    const btnAndIcon = Elements.createContainer({
      className: 'AllContainers__divOne--content',
      children: [icon, contentForContainerEvents],

    });

    // all eventsButtons and Containers
    const containerOne = Elements.createContainer({
      className: 'AllContainers__divOne',
      children: [btnAndIcon],

    });

    const contentForContainerEventsTwo = Elements.createButton({
      textContent: ' CHANGE YOUR EVENT',
      className: 'AllContainers__divTwo--text',

    });

    const iconTwo = Elements.createIcon({ classNames: ['fas', 'fa-cog', 'input-icon'] });

    const btnAndIconTwo = Elements.createContainer({
      className: 'AllContainers__divTwo--content',
      children: [iconTwo, contentForContainerEventsTwo],

    });
    const containerTwo = Elements.createContainer({
      className: 'AllContainers__divTwo',
      children: [btnAndIconTwo],
    });
    const containerThree = Elements.createContainer({
      className: 'AllContainers__divThree',
    });
    const containerFour = Elements.createContainer({
      className: 'AllContainers__divFour',
    });
    const containerFive = Elements.createContainer({
      className: 'AllContainers__divFive',
    });
    const containerSix = Elements.createContainer({
      className: 'AllContainers__divSix',
    });

    // content wrapper Three
    const dashboardEvents = Elements.createContainer({
      className: 'AllContainers',
      children: [containerOne, containerTwo, containerThree,
        containerFour, containerFive, containerSix],
    });
    // combine two wrappers
    const createContainer = Elements.createContainer({
      className: 'togheter',
      children: [homePageWrapperOne, homePageWrapperTwo, dashboardEvents],
    });

    dashboardContainer.appendChild(createContainer);
    return dashboardContainer;
  }
}
export default DashboardComponent;
