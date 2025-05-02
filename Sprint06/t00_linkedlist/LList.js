const LLData = require('./LLData');

class LList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  add(value) {
    const newNode = new LLData(value);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  addFromArray(array) {
    array.forEach((value) => this.add(value));
  }

  getFirst() {
    return this.head ? this.head.data : null;
  }

  getLast() {
    return this.tail ? this.tail.data : null;
  }

  remove(value) {
    if (!this.head) return;

    if (this.head.data === value) {
      this.head = this.head.next;
      this.length--;
      if (!this.head) this.tail = null;
      return;
    }

    let current = this.head;
    while (current.next && current.next.data !== value) {
      current = current.next;
    }

    if (current.next) {
      if (current.next === this.tail) {
        this.tail = current;
      }
      current.next = current.next.next;
      this.length--;
    }
  }

  removeAll(value) {
    while (this.head && this.head.data === value) {
      this.head = this.head.next;
      this.length--;
    }

    let current = this.head;
    while (current && current.next) {
      if (current.next.data === value) {
        if (current.next === this.tail) {
          this.tail = current;
        }
        current.next = current.next.next;
        this.length--;
      } else {
        current = current.next;
      }
    }

    if (!this.head) this.tail = null;
  }

  contains(value) {
    for (const data of this) {
      if (data === value) return true;
    }
    return false;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  count() {
    return this.length;
  }

  toString() {
    return [...this].join(',');
  }

  getIterator() {
    let current = this.head;
    return {
      next: () => {
        if (current) {
          const value = current.data;
          current = current.next;
          return { value, done: false };
        } else {
          return { done: true };
        }
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }

  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current.data;
      current = current.next;
    }
  }

  filter(callback) {
    const newList = new LList();
    for (const data of this) {
      if (callback(data)) {
        newList.add(data);
      }
    }
    return newList;
  }
}

module.exports = { LList };
