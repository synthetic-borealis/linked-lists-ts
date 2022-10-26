import { SingleLinkedList } from '../src';

describe('new list', () => {
  test('has a length of 0', () => {
    const list = new SingleLinkedList<number>();

    expect(list).toHaveLength(0);
  });

  test('isEmpty', () => {
    const list = new SingleLinkedList<number>();

    expect(list.isEmpty).toBeTruthy();
  });
});

describe('push', () => {
  test('increments list`s length', () => {
    const list = new SingleLinkedList<number>();

    list.push(2);
    expect(list).toHaveLength(1);
    list.push(4);
    expect(list).toHaveLength(2);
    list.push(8);
    expect(list).toHaveLength(3);
  });
});

describe('pop', () => {
  test('returns undefined for empty lists', () => {
    const list = new SingleLinkedList<number>();
    expect(list.pop()).toBeUndefined();
  });

  test('decrements list`s length', () => {
    const list = new SingleLinkedList<number>();

    list.push(2);
    list.push(4);
    list.push(8);
    list.pop();
    expect(list).toHaveLength(2);
    list.pop();
    expect(list).toHaveLength(1);
    list.pop();
    expect(list).toHaveLength(0);
    list.pop();
    expect(list).toHaveLength(0);
  });
});

describe('peek', () => {
  test('returns undefined if list is empty', () => {
    const list = new SingleLinkedList<number>();
    expect(list.peek()).toBeUndefined();
  });

  test('does not decrement list`s length', () => {
    const list = new SingleLinkedList<number>();

    list.push(2);
    list.peek();
    expect(list).toHaveLength(1);
  });

  test('retrieves correct element', () => {
    const list = new SingleLinkedList<number>();

    list.push(2);
    expect(list.peek()).toBe(2);
    list.push(16);
    expect(list.peek()).toBe(16);
  });
});

describe('reverse', () => {
  test('works correctly', () => {
    const list = new SingleLinkedList<number>();
    list.push(2);
    list.push(4);
    list.push(8);
    list.push(16);
    list.reverse();
    expect(list.pop()).toBe(2);
    expect(list.pop()).toBe(4);
    expect(list.pop()).toBe(8);
    expect(list.pop()).toBe(16);
  });
});

describe('get', () => {
  test('retrieves elements correctly', () => {
    const list = new SingleLinkedList<number>();
    list.push(2);
    list.push(4);
    list.push(8);
    list.push(16);
    expect(list.get(0)).toBe(16);
    expect(list.get(1)).toBe(8);
    expect(list.get(2)).toBe(4);
    expect(list.get(3)).toBe(2);
  });

  test('does not change list`s length', () => {
    const list = new SingleLinkedList<number>();
    list.push(2);
    list.push(4);
    list.push(8);
    list.push(16);
    list.get(0);
    list.get(1);
    list.get(2);
    list.get(3);
    expect(list).toHaveLength(4);
  });
});

describe('fromArray', () => {
  test('converts arrays correctly', () => {
    const array = [2, 4, 8, 16];
    const list = SingleLinkedList.fromArray(array);

    expect(list.pop()).toBe(2);
    expect(list.pop()).toBe(4);
    expect(list.pop()).toBe(8);
    expect(list.pop()).toBe(16);
  });
});

describe('forEach', () => {
  const array = [2, 4, 8, 16];
  const list = SingleLinkedList.fromArray(array);

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
