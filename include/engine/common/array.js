class Array {
    constructor() {
        this.data = [];
    }

    get(index) {
        return this.data[index];
    }

    set(index, value) {
        this.data[index] = value;
    }
}