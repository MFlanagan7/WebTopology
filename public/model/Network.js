export class Network {
    constructor(name) {
        this.name = name;
    }

    serialize() {
        return {
            name: this.name,
        }
    }
}