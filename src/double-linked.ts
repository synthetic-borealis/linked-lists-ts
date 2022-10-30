import {
  IIterable,
  ForEachCallback,
} from './iterable';

interface DoubleLinkedNode<T> {
  element: T;
  prev: DoubleLinkedNode<T> | undefined;
  next: DoubleLinkedNode<T> | undefined;
}

export default class DoubleLinkedList<T> implements IIterable<T> {
  #head: DoubleLinkedNode<T> | undefined;

  #tail: DoubleLinkedNode<T> | undefined;

  #length: number;

  constructor() {
    this.#head = undefined;
    this.#tail = undefined;
    this.#length = 0;
  }

  get length() {
    return this.#length;
  }

  get isEmpty() {
    return this.#length === 0;
  }

  pushFront(element: T) {
    const oldHead = this.#head;
    const newHead: DoubleLinkedNode<T> = {
      element,
      prev: undefined,
      next: oldHead,
    };
    this.#head = newHead;
    if (oldHead) {
      oldHead.prev = newHead;
    } else {
      this.#tail = newHead;
    }
    this.#length += 1;
  }

  popFront() {
    if (this.#head === undefined) {
      return undefined;
    }
    const { element } = this.#head;
    this.#length = Math.max(0, this.#length - 1);
    this.#head = this.#head.next;
    if (!this.#head) {
      this.#tail = undefined;
    }
    return element;
  }

  peekFront() {
    return this.#head?.element;
  }

  pushBack(element: T) {
    const oldTail = this.#tail;
    const newTail: DoubleLinkedNode<T> = {
      element,
      prev: oldTail,
      next: undefined,
    };
    this.#tail = newTail;
    if (oldTail) {
      oldTail.next = newTail;
    } else {
      this.#head = newTail;
    }
    this.#length += 1;
  }

  popBack() {
    if (this.#tail === undefined) {
      return undefined;
    }
    const { element } = this.#tail;
    this.#length = Math.max(0, this.#length - 1);
    this.#tail = this.#tail.prev;
    if (!this.#tail) {
      this.#head = undefined;
    }
    return element;
  }

  peekBack() {
    return this.#tail?.element;
  }

  reverse() {
    if (this.isEmpty) {
      return;
    }

    const array: Array<T> = [];
    while (!this.isEmpty) {
      array.push(this.popFront() as T);
    }
    array.forEach((element) => {
      this.pushFront(element);
    });
  }

  get(index: number) {
    if (index < 0 || index > this.#length - 1) {
      return undefined;
    }
    let currentIndex = 0;
    let currentNode = this.#head;
    while (currentIndex < index && currentNode !== undefined) {
      currentNode = currentNode.next;
      currentIndex += 1;
    }
    return currentNode?.element;
  }

  static fromArray<T>(array: Array<T>) {
    const list = new DoubleLinkedList<T>();
    const arr = array.slice(0);
    arr.forEach((element) => {
      list.pushBack(element);
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
