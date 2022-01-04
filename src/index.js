// // Element Helpers
// import './sass/main.scss';
// import Elements from './library/Elements';

// const appContainer = document.getElementById('container');

// const button = Elements.createButton({
//   textContent: 'klik hier',
// });

// const header = Elements.createHeader({
//   textContent: 'toop tegoare door Gent',
// });

// const loginContainer = Elements.createContainer({
//   children: [button, header],
// });

// appContainer.appendChild(loginContainer);

// Element Helpers
import App from './App';
import { HomePageComponent } from './components';
import ReigsterPageComponent from './components/registerPage';

const initApp = () => {
  const appContainer = document.getElementById('container');

  const app = new App(appContainer);
  app.addComponent(new HomePageComponent());
  app.addComponent(new ReigsterPageComponent());
};

window.addEventListener('load', initApp);
