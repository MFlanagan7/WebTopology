export class Connection {
    constructor(deviceName1, port1, deviceName2, port2) {
        this.deviceName1 = deviceName1;
        this.port1 = port1;
        this.deviceName2 = deviceName2;
        this.port2 = port2;
    }

    serialize() {
        return {
            deviceName1: this.deviceName1,
            port1: this.port1,
            deviceName2: this.deviceName2,
            port2: this.port2,
        }
    }
}