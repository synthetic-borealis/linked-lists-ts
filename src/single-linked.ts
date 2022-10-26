import {
  IIterable,
  ForEachCallback,
} from './iterable';

interface SingleLinkedNode<T> {
  element: T;
  next: SingleLinkedNode<T> | undefined;
}

export default class SingleLinkedList<T> implements IIterable<T> {
  #head: SingleLinkedNode<T> | undefined;
  #length: number;

  constructor() {
    this.#head = undefined;
    this.#length = 0;
  }

  get length() {
    return this.#length;
  }

  get isEmpty() {
    return this.#length === 0;
  }

  push(element: T) {
    const oldHead = this.#head;
    this.#head = {
      element,
      next: oldHead,
    };
    this.#length += 1;
  }

  pop() {
    if (this.#head === undefined) {
      return undefined;
    }
    const element = this.#head.element;
    this.#length = Math.max(0, this.#length - 1);
    this.#head = this.#head.next;
    return element;
  }

  peek() {
    if (this.#head === undefined) {
      return undefined;
    }
    return this.#head.element;
  }

  reverse() {
    if (this.isEmpty) {
      return;
    }

    const array: Array<T> = [];
    while (!this.isEmpty) {
      array.push(this.pop() as T);
    }
    array.forEach((element) => {
      this.push(element);
    });
  }

  get(index: number) {
    if (index < 0 || index > this.length - 1) {
      throw new Error('index out of bounds');
    }
    let currentIndex = 0;
    let currentNode = this.#head;
    while (currentIndex < index && currentNode !== undefined) {
      currentNode = currentNode.next;
      currentIndex += 1;
    }
    if (currentNode === undefined) {
      throw new Error('index out of bounds');
    }
    return currentNode.element;
  }

  static fromArray<T>(array: Array<T>) {
    const list = new SingleLinkedList<T>();
    const arr = array.slice(0);
    arr.reverse();
    arr.forEach((element) => {
      list.push(element);
    });
    return list;
  }

  forEach(callback: ForEachCallback<T>): void {
    let index = 0;
    let currentNode = this.#head;

    if (this.isEmpty || currentNode === undefined) {
      return;
    }

    while (currentNode) {
      callback(currentNode.element, index);
      currentNode = currentNode.next;
      index += 1;
    }
  }
}
