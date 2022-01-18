/* eslint-disable no-undef */
const alles = document.getElementById('imageName');
alles.onchange = (e) => {
  files = e.target.files;
  console.log(files);
};
