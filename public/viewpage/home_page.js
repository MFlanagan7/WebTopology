import * as Auth from '../controller/auth.js'
import * as Elements from './elements.js'
import { changes } from '../changelog.js';
import * as Constants from '../model/constants.js'

export function addEventListeners() {

  // Event listeners

}

export function home_page() {
  if (!Auth.currentUser) {
    Elements.root.innerHTML = `
        <h3>Not Signed In</h3>
    `;
    return;
  }

  let html = `<h3 class="d-flex justify-content-center m-3">Home<h3>
  <br>
  <p class="home-page">View the <a href="https://trello.com/b/RTfWOsQ2/web-topology" target="_blank">Task Board</a></p>
  <h4>Changelog</h4>`;

  for(let i = changes.length - 1; i >= 0; i--) {
    html += `<p class="home-page"> - ${changes[i]}</p>`;
  }

  Elements.root.innerHTML = html;

}
