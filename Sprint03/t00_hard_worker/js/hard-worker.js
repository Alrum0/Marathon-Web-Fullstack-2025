class HardWorker {
    constructor() {
        this._name = '';
        this._age = 0;
        this._salary = 0;
    }

    set name(value) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    set age(value) {
        if (value >= 1 && value <= 100) {
            this._age = value;
        } else {
            console.log('Invalid age');
        }
    }

    get age() {
        return this._age;
    }

    set salary(value) {
        if (value >= 100 && value <= 10000) {
            this._salary = value;
        } else {
            console.log('Invalid salary');
        }
    }

    get salary() {
        return this._salary;
    }

    toObject() {
        return {
            name: this._name,
            age: this._age,
            salary: this._salary
        }
    }

}


worker = new HardWorker;
worker.name = 'Bruce';
console.log(worker.name);
// Bruce
worker.age = 50;
worker.salary = 1500;
console.log(worker.toObject());
// Object { name: "Bruce", age: 50, salary: 1500 }
worker.name = 'Linda';
worker.age = 140;
console.log(worker.toObject());
// Object { name: "Linda", age: 50, salary: 1500 }