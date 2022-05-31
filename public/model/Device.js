import * as Firebase from "./../controller/firestore_controller.js";

export class Device {
    constructor(name, description, numPorts, make, model, deviceType, ID) {
        this.name = name;
        this.description = description;
        this.numPorts = numPorts;
        this.make = make;
        this.model = model;
        this.deviceType = deviceType;
        this.ID = ID;
        this.installed = null;
        this.connections = [];

        this.connections[0] = null;
        for (let i = 1; i <= numPorts; i++) {
            this.connections[i] = 'Empty';
        }
    }

    toString() {
        return this.make + ' ' + this.model + ' ' + this.name + ' ' + this.ID;
    }

    addConnection(connection, port) {
        this.connections[port] = connection;
    }

    revmoveConnection(port) {
        this.connections[port] = null;
    }

    installInRack(rack, slotNum) {
        if (this.installed) {
            alert(this.name + ' is already installed in ' + this.installed);
            return;
        } else if (rack.devices[slotNum] != null) {
            alert(rack.name + ' ' + slotNum + ' is already occupied!');
            return;
        } else {
            this.installed = rack.name;
            rack.devices[slotNum] = this;
        }
    }

    uninstallFromRack() {

    }

    serialize() {
        return {
            name: this.name,
            description: this.description,
            numPorts: this.numPorts,
            make: this.make,
            model: this.model,
            deviceType: this.deviceType,
            ID: this.ID,
            installed: this.installed,
            connections: this.connections,
        }
    }
}