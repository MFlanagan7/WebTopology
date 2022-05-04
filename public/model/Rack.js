export class Rack {
    constructor(name, description, room, numSlots) {
        this.name = name;
        this.description = description;
        this.room = room;
        this.numSlots = numSlots;
        this.frontRackDevices = [];
        this.rearRackDevices = [];
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

    revmoveDevice(side, slotNum) {
        if (side === 'front') {
            this.frontRackDevices[slotNum] = null;
        } else {
            this.rearRackDevices[slotNum] = null;
        }
    }

    changeRoom(room) {
        this.room = room;
    }
}