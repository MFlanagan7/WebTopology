export class Room {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.racks = [];
    }

    serialize() {
        return {
            name: this.name,
            description: this.description,
            racks: this.racks,
        }
    }

    addRack(rack) {
        this.racks.push(rack);
    }

    revmoveRack(rack) {
        const index = this.racks.indexOf(rack);
        this.racks.splice(index, 1);
    }
}