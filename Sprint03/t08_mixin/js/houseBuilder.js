const houseBlueprint = {
    address: '',
    date: new Date(),
    description: '',
    owner: '',
    size: 0,
    getDaysToBuild() {
        return this.size / this._building_speed;
    }
};

function HouseBuilder(address, description, owner, size, roomCount) {
    this.address = address;
    this.description = description;
    this.owner = owner;
    this.size = size;
    this.roomCount = roomCount;
}

HouseBuilder.prototype = houseBlueprint;
HouseBuilder.prototype._building_speed = 0.5;
