class Building {
    constructor(floors, material, address) {
        this.floors = floors;
        this.material = material;
        this.address = address;
    }

    toString() {
        return [
            `Floors: ${this.floors}`,
            `Material: ${this.material}`,
            `Address: ${this.address}`,
        ].join('\n');
    }
};

class Tower extends Building {
    constructor(floors, material, address) {
        super(floors, material, address);
        this.hasElevator = false;
        this.arcCapacity = 0;
        this.height = 0;
    }

    getFloorHeight() {
        if (this.height > 0 && this.floors > 0) {
            return this.height / this.floors;
        } else {
            console.log('Invalid height or floors');
            return 0;
        }
    }

    toString() {
        return [
            `${super.toString()} Elevator: ${this.hasElevator ? '+' : '-'}`,
            `Arc reactor capacity: ${this.arcCapacity}`,
            `Height: ${this.height}`,
            `Floor height: ${this.getFloorHeight()}`
        ].join('\n');
    }
}

