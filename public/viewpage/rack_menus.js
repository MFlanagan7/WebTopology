import * as Auth from '../controller/auth.js'
import * as Elements from './elements.js'
import * as Constants from '../model/constants.js'
import * as Firestore from '../controller/firestore_controller.js';
import { Room } from '../model/Room.js';
import { Rack } from '../model/Rack.js';
import { Device } from '../model/Device.js';
import { Connection } from '../model/Connection.js';

// const noMonitor = 'No Monitor';

// export let unsubButtonsDoc = null;

export function addEventListeners() {

//   window.addEventListener('unload', e => {
//     if (unsubButtonsDoc) {
//       unsubButtonsDoc();
//     }
//   });

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

export async function rack_menus_page() {
  if (!Auth.currentUser) {
    Elements.root.innerHTML = `
        <h3>Not Signed In</h3>
    `;
    return;
  }

  const Room1 = new Room('Room 1', 'This is room 1');
  const Rack1 = new Rack('Rack 1', 'This is rack 1', "Room 15", 48);

  const Device1 = new Device('Device1', 'This is device 1', 24, 'Dell', 'Model 29A', 'Router', 'Dell-29A-Router-Device1');
  const Device2 = new Device('Device2', 'This is device 2', 48, 'Cisco', 'Model Switch 52', 'Switch', 'Cisco-S52-Switch-Device2');

  const Connection1 = new Connection(Device1.name, 12, Device2.name, 15)

  Room1.addRack(Rack1);
  Rack1.addDevice(Device1, 'front', 12);
  Rack1.addDevice(Device2, 'rear', 15);
  Device1.addConnection(Connection1, 12);
  Device2.addConnection(Connection1, 15);
  

  console.log(Room1);
  console.log(Rack1);
  // console.log(Device1);
  // console.log(Device2);
  // console.log(Connection1);

  let html = '<h3 class="d-flex justify-content-center m-3">Rack Menus</h3>';
  html += `
    <div class="post-auth">
        <button id="button-new-rack" type="button" class="btn btn-info me-3">New Rack</button>
        <button id="button-new-device" type="button" class="btn btn-info me-3">New Device</button>
        <button id="button-new-connection" type="button" class="btn btn-info me-3">New Connection</button>
    </div>

    <div class="main-content" id="main-content">

    </div>

    <div id="modal-new-rack" class="modal">

        <!-- Modal content -->
        <div class="modal-content">
            <div class="modal-header">
                <span class="close">&times;</span>
                <h3 id="modal-title">Add a New Rack</h3>
            </div>
            <div class="modal-body">
                <form id="form-new-rack">
                    <span>
                        <label for="rack-name">Name</label>
                        <input type="text" id="rack-name" name="rack-name">
                    </span>

                    <span>
                        <label for="rack-description">Description</label>
                        <input type="text" id="rack-description" name="rack-description">
                    </span>

                    <span>
                        <label for="rack-room">Room</label>
                        <input type="text" id="rack-room" name="rack-room">
                    </span>

                    <span>
                        <label for="rack-num-slots">Number of Slots</label>
                        <input type="text" id="rack-num-slots" name="rack-num-slots">
                    </span>
                </form>

                <form id="form-new-device">
                    <span>
                        <label for="device-name">Name</label>
                        <input type="text" id="device-name" name="device-name">
                    </span>

                    <span>
                        <label for="device-description">Description</label>
                        <input type="text" id="device-description" name="device-description">
                    </span>

                    <span>
                        <label for="device-num-ports">Number of Ports</label>
                        <input type="text" id="device-num-ports" name="device-num-ports">
                    </span>

                    <span>
                        <label for="device-make">Make</label>
                        <input type="text" id="device-make" name="device-make">
                    </span>

                    <span>
                        <label for="device-model">Model</label>
                        <input type="text" id="device-model" name="device-model">
                    </span>

                    <span>
                        <label for="device-type">Device Type</label>
                        <input type="text" id="device-type" name="device-type">
                    </span>

                    <span>
                        <label for="device-ID">Device ID</label>
                        <input type="text" id="device-ID" name="device-ID">
                    </span>
                </form>

                <form id="form-new-connection">
                    <span id="device1-span">
                        <label for="connection-device1">Device 1</label>
                        <input type="text" id="connection-device1" name="connection-device1">
                    </span>

                    <span>
                        <label for="connection-port1">Port 1</label>
                        <input type="text" id="connection-port1" name="connection-port1">
                    </span>

                    <span id="device2-span">
                        <label for="connection-device2">Device 2</label>
                        <input type="text" id="connection-device2" name="connection-device2">
                    </span>

                    <span>
                        <label for="connection-port2">Port 2</label>
                        <input type="text" id="connection-port2" name="connection-port2">
                    </span>
                </form>
            </div>
            <div class="modal-footer">
                    <button id="button-create-new-rack">Create Rack</button>
                    <button id="button-create-new-device">Create Device</button>
                    <button id="button-create-new-connection">Create Connection</button>
                </form>
            </div>
        </div>

    </div>
  `;

    Elements.root.innerHTML = html;

    // populate main-content div with rack data from firestore
    const racks = await Firestore.getRackList();
    // const devices = await Firestore.getDeviceList();

    const mainContentDiv = document.getElementById('main-content');

    let mainContentHTML = ``;

    racks.forEach( (rack => {
      mainContentHTML = buildRack(rack);
      mainContentDiv.innerHTML += mainContentHTML;
    }));

    

    // Get the modal
    var modal = document.getElementById("modal-new-rack");

    // Get the button that opens the modal
    var buttonCreateRack = document.getElementById("button-new-rack");
    var buttonCreateDevice = document.getElementById("button-new-device");
    var buttonCreateConnection = document.getElementById("button-new-connection");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the create rack button, open the modal 
    buttonCreateRack.onclick = function() {
      const title = document.getElementById('modal-title');
      const rackForm = document.getElementById('form-new-rack');
      const deviceForm = document.getElementById('form-new-device');
      const connectionForm = document.getElementById('form-new-connection');
      const rackButton = document.getElementById('button-create-new-rack');
      const deviceButton = document.getElementById('button-create-new-device');
      const connectionButton = document.getElementById('button-create-new-connection');
      title.innerHTML = 'Add a New Rack';
      connectionForm.style.display = 'none';
      connectionButton.style.display = 'none';
      deviceForm.style.display = 'none';
      deviceButton.style.display = 'none';
      rackForm.style.display = 'flex';
      rackButton.style.display = 'block';
      modal.style.display = "block";
    }

    // When the user clicks the create device button, open the modal 
    buttonCreateDevice.onclick = function() {
      const title = document.getElementById('modal-title');
      const rackForm = document.getElementById('form-new-rack');
      const deviceForm = document.getElementById('form-new-device');
      const connectionForm = document.getElementById('form-new-connection');
      const rackButton = document.getElementById('button-create-new-rack');
      const deviceButton = document.getElementById('button-create-new-device');
      const connectionButton = document.getElementById('button-create-new-connection');
      title.innerHTML = 'Add a New Device';
      connectionForm.style.display = 'none';
      connectionButton.style.display = 'none';
      deviceForm.style.display = 'flex';
      deviceButton.style.display = 'block';
      rackForm.style.display = 'none';
      rackButton.style.display = 'none';
      modal.style.display = "block";
    }

    // When the user clicks the create connection button, open the modal 
    buttonCreateConnection.onclick = async function() {
      const title = document.getElementById('modal-title');
      const rackForm = document.getElementById('form-new-rack');
      const deviceForm = document.getElementById('form-new-device');
      const connectionForm = document.getElementById('form-new-connection');
      const rackButton = document.getElementById('button-create-new-rack');
      const deviceButton = document.getElementById('button-create-new-device');
      const connectionButton = document.getElementById('button-create-new-connection');
      const device1Span = document.getElementById('device1-span');
      const device2Span = document.getElementById('device2-span');
      const devices = await Firestore.getDeviceList();

      let html = `<label>Device 1</label><select id='device1-list'>`;
      html += buildDeviceInputs(devices);
      html += `</select>`;
      device1Span.innerHTML = html;

      html = `<label>Device 2</label><select id='device2-list'>`;
      html += buildDeviceInputs(devices);
      html += `</select>`;
      device2Span.innerHTML = html;

      title.innerHTML = 'Add a New Connection';
      connectionForm.style.display = 'flex';
      connectionButton.style.display = 'block';
      deviceForm.style.display = 'none';
      deviceButton.style.display = 'none';
      rackForm.style.display = 'none';
      rackButton.style.display = 'none';
      modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // add new rack
    const createRackButton = document.getElementById('button-create-new-rack');
    createRackButton.addEventListener('click', async e => {
        e.preventDefault();
        const rackName = document.getElementById('rack-name').value;
        const rackDescription = document.getElementById('rack-description').value;
        const rackRoom = document.getElementById('rack-room').value;
        const rackNumSlots = document.getElementById('rack-num-slots').value;

        // TODO: better form validation
        if (rackName && rackDescription && rackRoom && rackNumSlots) {
            const newRack = new Rack(rackName, rackDescription, rackRoom, rackNumSlots);
            try {
              const doc = await Firestore.addRack(newRack);
              console.log(doc + " added!");
              alert('Rack added!');
              window.location.href = "/rack_menus";

            } catch (e) {
              if (Constants.DEV === true)
                console.log(e);
            }
        }
        
    })

    // add new device
    const createDeviceButton = document.getElementById('button-create-new-device');
    createDeviceButton.addEventListener('click', async e => {
        e.preventDefault();
        const deviceName = document.getElementById('device-name').value;
        const deviceDescription = document.getElementById('device-description').value;
        const deviceNumPorts = document.getElementById('device-num-ports').value;
        const deviceMake = document.getElementById('device-make').value;
        const deviceModel = document.getElementById('device-model').value;
        const deviceType = document.getElementById('device-type').value;
        const deviceID = document.getElementById('device-ID').value;

        // TODO: better form validation
        if (deviceName && deviceDescription && deviceNumPorts && deviceMake && deviceModel && deviceType && deviceID) {
            const newDevice = new Device(deviceName, deviceDescription, deviceNumPorts, deviceMake, deviceModel, deviceType, deviceID);
            try {
              const doc = await Firestore.addDevice(newDevice);
              console.log(doc + " added!");
              alert('Device added!');
              window.location.href = "/rack_menus";

            } catch (e) {
              if (Constants.DEV === true)
                console.log(e);
            }
        }
        
    })

    // add new connection
    const createConnectionButton = document.getElementById('button-create-new-connection');
    createConnectionButton.addEventListener('click', async e => {
      e.preventDefault();
      const connectionDevice1 = document.getElementById('device1-list').value;
      const connectionPort1 = document.getElementById('connection-port1').value;
      const connectionDevice2 = document.getElementById('device2-list').value;
      const connectionPort2 = document.getElementById('connection-port2').value;

      // TODO: better form validation
      if (connectionDevice1 && connectionPort1 && connectionDevice2 && connectionPort2) {
          const newConnection = new Connection(connectionDevice1, connectionPort1, connectionDevice2, connectionPort2);
          try {
            const doc = await Firestore.addConnection(newConnection);
            console.log(doc + " added!");
            alert('Connection added!');
            window.location.href = "/rack_menus";

          } catch (e) {
            if (Constants.DEV === true)
              console.log(e);
          }
      }
      
    })

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

function buildRack(rack) {
  let html = `<div class='rack'>
  <button id="button-add-device-${rack.name}">Add Device</button>
  <button id="button-remove-device-${rack.name}">Remove Device</button>
  <p>${rack.name}</p>
  <p>${rack.description}</p>
  <p>${rack.room}</p>
  <p>${rack.numSlots} Slots</p>
  <div class="rack-sides">
  <table><tr><td>Slot</td><td>Device</td></tr>
  `;
  for (let i = rack.numSlots; i > 0; i--) {
    html += `<tr><td>${i}</td><td>${rack.frontRackDevices[i] || 'Empty'}</td></tr>`;
  }

  html += `</table>
  <table><tr><td>Slot</td><td>Device</td></tr>`;

  for (let i = rack.numSlots; i > 0; i--) {
    html += `<tr><td>${i}</td><td>${rack.rearRackDevices[i] || 'Empty'}</td></tr>`;
  }

  html += `</table></div></div>`
  return html;
}

function buildDevice(device) {
  let html = `<div class='device'>
  <p>${device.name}</p>
  <p>${device.description}</p>
  <p>${device.numPorts} Ports</p>
  <p>${device.make}</p>
  <p>${device.model}</p>
  <p>${device.deviceType}</p>
  <table><tr><td>Port</td><td>Device</td><td>Device</td><td>Port</td></tr>`;
  
  for (let i = 0; i < device.numPorts; i++) {
    html += `<tr>
      <td>${device.connections[i].port1 || 'Empty'}</td>
      <td>${device.connections[i].deviceName1 || 'Empty'}</td>
      <td>${device.connections[i].deviceName2 || 'Empty'}</td>
      <td>${device.connections[i].port2 || 'Empty'}</td>`;
  }
  html += `</table></div>`;
  return html;
}

function buildDeviceInputs(devices) {
  var html;
  console.log(devices);
  for (let i = 0; i < devices.length; i++) {
    html += `<option value='${devices[i].name}'>${devices[i].name}</option>`;
  }
  return html;
}