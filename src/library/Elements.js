/**
 * My Element Helpers
 */

const Elements = {

  createButton({ textContent = '', className }) {
    const button = document.createElement('button');
    button.textContent = textContent;
    button.classList.add(className);
    return button;
  },

  createIcon({ classNames = [] }) {
    const icon = document.createElement('i');
    if (classNames.length) icon.classList.add(...classNames);

    return icon;
  },

  createHeader({ textContent = ' ', className }) {
    const header = document.createElement('h1');
    header.textContent = textContent;
    header.classList.add(className);
    return header;
  },
  createText({ textContent = ' ', className }) {
    const text = document.createElement('p');
    text.textContent = textContent;
    text.classList.add(className);
    return text;
  },

  createImage({ newSource, className }) {
    const picture = document.createElement('img');
    picture.src = newSource;
    picture.classList.add(className);
    return picture;
  },

  createInputField({
    className, type, text, placeholder,
  }) {
    const inputField = document.createElement('input');
    inputField.classList.add(className);
    inputField.setAttribute(type, text);
    inputField.placeholder = placeholder;
    return inputField;
  },

  createContainer({
    className = '', id = '', children = [],
  }) {
    const container = document.createElement('div');
    if (id) container.setAttribute('id', id);
    container.className = className;

    if (children.length) {
      children.forEach((child) => {
        if (child instanceof Element) {
          container.appendChild(child);
        }
      });
    }
    return container;
  },

};

export default Elements;
