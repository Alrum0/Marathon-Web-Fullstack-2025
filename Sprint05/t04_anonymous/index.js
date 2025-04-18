exports.getAnonymous = function (name, alias, affiliation) {
    return new class {
        
        #name
        #alies
        #affiliation

        constructor(name, alias, affiliation) {
            this.#name = name;
            this.#alies = alias;
            this.#affiliation = affiliation;
        }

        get name() {
            return this.#name;
        }
        get alias() {
            return this.#alies;
        }
        get affiliation() {
            return this.#affiliation;
        }
    }(name, alias, affiliation);
}

