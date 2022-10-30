import { DoubleLinkedList } from '../src';

describe('new list', () => {
  test('has a length of 0', () => {
    const list = new DoubleLinkedList<number>();

    expect(list).toHaveLength(0);
  });

  test('isEmpty', () => {
    const list = new DoubleLinkedList<number>();

    expect(list.isEmpty).toBeTruthy();
  });
});

describe('pushFront', () => {
  test('increments list`s length', () => {
    const list = new DoubleLinkedList<number>();

    list.pushFront(2);
    expect(list).toHaveLength(1);
    list.pushFront(4);
    expect(list).toHaveLength(2);
    list.pushFront(8);
    expect(list).toHaveLength(3);
  });
});

describe('popFront', () => {
  test('returns undefined for empty list', () => {
    const list = new DoubleLinkedList<number>();

    expect(list.popFront()).toBeUndefined();
  });

  test('decrements list`s length', () => {
    const list = new DoubleLinkedList<number>();

    list.pushFront(2);
    list.pushFront(4);
    list.pushFront(8);
    list.popFront();
    expect(list).toHaveLength(2);
    list.popFront();
    expect(list).toHaveLength(1);
    list.popFront();
    expect(list).toHaveLength(0);
    list.popFront();
    expect(list).toHaveLength(0);
  });

  test('retrieves elements correctly', () => {
    const list = new DoubleLinkedList<number>();

    list.pushBack(2);
    list.pushBack(4);
    list.pushBack(8);
    expect(list.popFront()).toBe(2);
    expect(list.popFront()).toBe(4);
    expect(list.popFront()).toBe(8);
    expect(list.popFront()).toBeUndefined();
  });
});

describe('peekFront', () => {
  test('retrieves elements correctly', () => {
    const list = new DoubleLinkedList<number>();

    list.pushFront(2);
    expect(list.peekFront()).toBe(2);
    list.popFront();
    expect(list.peekFront()).toBeUndefined();
  });

  test('does`nt change list`s length', () => {
    const list = new DoubleLinkedList<number>();

    list.pushFront(2);
    list.peekFront();
    expect(list).toHaveLength(1);
  });
});

describe('pushBack', () => {
  test('increments list`s length', () => {
    const list = new DoubleLinkedList<number>();

    list.pushBack(2);
    expect(list).toHaveLength(1);
    list.pushBack(4);
    expect(list).toHaveLength(2);
    list.pushBack(8);
    expect(list).toHaveLength(3);
  });
});

describe('popBack', () => {
  test('decrements list`s length', () => {
    const list = new DoubleLinkedList<number>();

    list.pushFront(2);
    list.pushFront(4);
    list.pushFront(8);
    list.popBack();
    expect(list).toHaveLength(2);
    list.popBack();
    expect(list).toHaveLength(1);
    list.popBack();
    expect(list).toHaveLength(0);
    list.popBack();
    expect(list).toHaveLength(0);
  });

  test('retrieves elements correctly', () => {
    const list = new DoubleLinkedList<number>();

    list.pushFront(2);
    list.pushFront(4);
    list.pushFront(8);
    expect(list.popBack()).toBe(2);
    expect(list.popBack()).toBe(4);
    expect(list.popBack()).toBe(8);
    expect(list.popBack()).toBeUndefined();
  });
});

describe('peekBack', () => {
  test('retrieves elements correctly', () => {
    const list = new DoubleLinkedList<number>();

    list.pushFront(2);
    expect(list.peekBack()).toBe(2);
  });

  test('does`nt change list`s length', () => {
    const list = new DoubleLinkedList<number>();

    list.pushBack(2);
    list.peekBack();
    expect(list).toHaveLength(1);
  });
});

describe('reverse', () => {
  test('works correctly', () => {
    const list = new DoubleLinkedList<number>();

    list.pushFront(2);
    list.pushFront(4);
    list.pushFront(8);
    list.pushFront(16);
    list.reverse();

    expect(list.popFront()).toBe(2);
    expect(list.popFront()).toBe(4);
    expect(list.popFront()).toBe(8);
    expect(list.popFront()).toBe(16);
    expect(list.popFront()).toBeUndefined();
  });
});

describe('get', () => {
  test('retrieves elements correctly', () => {
    const list = new DoubleLinkedList<number>();

    list.pushFront(2);
    list.pushFront(4);
    list.pushFront(8);
    list.pushFront(16);
    expect(list.get(0)).toBe(16);
    expect(list.get(1)).toBe(8);
    expect(list.get(2)).toBe(4);
    expect(list.get(3)).toBe(2);
    expect(list.get(4)).toBeUndefined();
  });

  test('does`nt change list`s length', () => {
    const list = new DoubleLinkedList<number>();

    list.pushFront(2);
    list.pushFront(4);
    list.pushFront(8);
    list.pushFront(16);
    list.get(0);
    list.get(1);
    list.get(2);
    list.get(3);
    expect(list).toHaveLength(4);
  });
});

describe('fromArray', () => {
  test('converts arrays correctly', () => {
    const arr = [2, 4, 8, 16];
    const list = DoubleLinkedList.fromArray(arr);

    expect(list.popFront()).toBe(2);
    expect(list.popFront()).toBe(4);
    expect(list.popFront()).toBe(8);
    expect(list.popFront()).toBe(16);
  });
});

describe('forEach', () => {
  const arr = [2, 4, 8, 16];
  const list = DoubleLinkedList.fromArray(arr);

  test('does`nt modify list`s length', () => {
    // this is necessary for the test to work
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,arrow-body-style
    list.forEach((_a: number) => {
      // same goes for this
      // eslint-disable-next-line no-useless-return
      return;
    });
    expect(list).toHaveLength(4);
  });

  test('works with callbacks with idx parameter', () => {
    let index = 0;
    list.forEach((elem, idx) => {
      expect(idx).toEqual(index);
      expect(elem).not.toBe(0);
      expect(elem % 2).toBe(0);
      index += 1;
    });
  });

  test('works with callbacks without idx parameter', () => {
    list.forEach((elem: number) => {
      expect(elem).not.toBe(0);
      expect(elem % 2).toBe(0);
    });
  });
});
