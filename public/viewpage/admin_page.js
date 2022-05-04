import * as Auth from '../controller/auth.js'
import * as Elements from './elements.js'
import * as Constants from '../model/constants.js'

// const noMonitor = 'No Monitor';

// export let unsubButtonsDoc = null;

export function addEventListeners() {

  // window.addEventListener('unload', e => {
  //   if (unsubButtonsDoc) {
  //     unsubButtonsDoc();
  //   }
  // });

  // Elements.buttonInitConfig.addEventListener('click', async e => {
  //   try {
  //     await initFirestoreDocs();
  //     alert('Firestore collection initialized!')
  //   } catch (e) {
  //     console.log(`Init Config error:\n${e}`);
  //     alert(`Init Config error:\n${e}`);
  //   }
  // });

}

export function admin_page() {
  if (!Auth.currentUser) {
    Elements.root.innerHTML = `
        <h3>Not Signed In</h3>
    `;
    return;
  }

  let html = '<h3 class="d-flex justify-content-center m-3">Admin<h3>';
  html += `
    Coming soon. . .
  `;

  Elements.root.innerHTML = html;

  // const statusMonitorButton = document.getElementById('button-monitor-button-status');
  // statusMonitorButton.addEventListener('click', e => {
  //   const label = e.target.innerHTML;
  //   if (label == 'Start') {
  //     e.target.innerHTML = 'Stop';
  //     // listen to Firestore doc changes
  //     unsubButtonsDoc = attachRealtimeListener(Constants.COLLECTION,
  //       Constants.DOCNAME_BUTTONS, buttonListener);
  //   } else {
  //     e.target.innerHTML = 'Start';
  //     const status1 = document.getElementById('status-button1');
  //     const status2 = document.getElementById('status-button2');
  //     status1.innerHTML = noMonitor;
  //     status2.innerHTML = noMonitor;
  //     if (unsubButtonsDoc) unsubButtonsDoc();
  //   }
  // });

  // const ledButton = document.getElementById('button-led-control');
  // ledButton.addEventListener('click', e => {
  //   const label = e.target.innerHTML;
  //   if (label == 'Turn ON') {
  //     e.target.innerHTML = 'Turn OFF';
  //     updateDocForLED({ led1: true });
  //   } else {
  //     e.target.innerHTML = 'Turn ON';
  //     updateDocForLED({ led1: false });
  //   }
  // });

}

function buttonListener(doc) {
  const status1 = document.getElementById('status-button1');
  const status2 = document.getElementById('status-button2');
  const buttonDoc = doc.data();
  if (buttonDoc['button1']) {
    status1.innerHTML = 'ON';
  } else {
    status1.innerHTML = 'OFF';
  }
  if (buttonDoc['button2']) {
    status2.innerHTML = 'ON';
  } else {
    status2.innerHTML = 'OFF';
  }
}