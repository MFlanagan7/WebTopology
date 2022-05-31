export class Rack {
    constructor(name, description, room, numSlots) {
        this.name = name;
        this.description = description;
        this.room = room;
        this.numSlots = numSlots;
        this.frontRackDevices = [];
        this.rearRackDevices = [];

        this.frontRackDevices[0] = null;
        this.rearRackDevices[0] = null;
        for (let i = 1; i <= numSlots; i++) {
            this.frontRackDevices[i] = 'Empty';
            this.rearRackDevices[i] = 'Empty';
        }
    }

    serialize() {
        return {
            name: this.name,
            description: this.description,
            room: this.room,
            numSlots: this.numSlots,
            frontRackDevices: this.frontRackDevices,
            rearRackDevices: this.rearRackDevices,
        }
    }

    addDevice(device, side, slotNum) {
        if (side === 'front') {
            this.frontRackDevices[slotNum] = device;
        } else {
            this.rearRackDevices[slotNum] = device;
        }
        
    }

    removeDevice(device) {
        for (let i = 1; i <= this.frontRackDevices.length; i++) {
            console.log(this.frontRackDevices[i])
            if (device.name === this.frontRackDevices[i]) {
                let port = i;
                this.frontRackDevices[port] = 'Empty';
                return;
            }
        }

        for (let i = 1; i <= this.rearRackDevices.length; i++) {
            if (device.name === this.rearRackDevices[i]) {
                let port = i;
                this.rearRackDevices[port] = 'Empty';
                return;
            }
        }
    }

    getDevices() {

    }

    changeRoom(room) {
        this.room = room;
    }
}