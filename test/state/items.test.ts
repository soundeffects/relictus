import {
  nameItem,
  describeItem,
  validItemId,
  listAllItems,
  describeFixedElseList,
  itemHasCarryClass,
  resetItems,
  CarryClass
} from '../../src/state/items';


beforeEach(() => {
  resetItems();
});


describe('nameItem', () => {
  it('should give correct name for net', () => {
    expect(nameItem('net')).toBe('Net Machinery');
  });

  it('should give correct name for grasper', () => {
    expect(nameItem('grasper')).toBe('Grasper Attachment');
  });

  it('should throw for undefined item', () => {
    expect(() => nameItem('undefined')).toThrow();
  });
});


describe('describeItem', () => {
  it('should give correct description for net', () => {
    const description = "Packed away are folds of wires, " +
      "mechanisms, and metal sheet, illuminated by flashes " +
      "and sparks. It appears things here are in disrepair."
    expect(describeItem('net')).toBe(description);
  });

  it('should give correct description for grasper', () => {
    expect(describeItem('grasper')).toBe("");
  });

  it('should throw for undefined item', () => {
    expect(() => describeItem('undefined')).toThrow();
  });
});


describe('validItemId', () => {
  it('returns true for valid item', () => {
    expect(validItemId('net')).toBeTruthy();
  });

  it('returns true for another valid item', () => {
    expect(validItemId('grasper')).toBeTruthy();
  });

  it('returns false for invalid item', () => {
    expect(validItemId('undefined')).toBeFalsy();
  });
});


describe('listAllItems', () => {
  it('should say nothing is here for an empty array', () => {
    const sentence = "There is nothing here.";
    expect(listAllItems([])).toBe(sentence);
  });

  it('should say a singular item correctly', () => {
    const sentence = "There is a Grasper Attachment here.";
    expect(listAllItems(['grasper'])).toBe(sentence);
  });

  it('should say a plural item correctly', () => {
    const sentence = "There are some Net Machinery here.";
    expect(listAllItems(['net'])).toBe(sentence);
  });

  it('should list two items correctly', () => {
    const sentence = "There are some Net Machinery, and a Grasper Attachment here.";
    expect(listAllItems(['net', 'grasper'])).toBe(sentence);
  });

  it('should throw for undefined item', () => {
    expect(() => listAllItems(['net', 'undefined'])).toThrow();
  });
});


describe('describeFixedElseList', () => {
  it('should return an empty array when given an empty array', () => {
    expect(describeFixedElseList([])).toStrictEqual([]);
  });

  it('should return an array with one description for fixed item', () => {
    const description = "Packed away are folds of wires, " +
      "mechanisms, and metal sheet, illuminated by flashes " +
      "and sparks. It appears things here are in disrepair."
    expect(describeFixedElseList(['net'])).toStrictEqual([ description ]);
  });

  it('should return an array with a list for loose items', () => {
    const list = "There is a Grasper Attachment here.";
    expect(describeFixedElseList(['grasper'])).toStrictEqual([ list ]);
  });

  it('should return an array with both descriptions and a list correctly', () => {
    const description = "Packed away are folds of wires, " +
      "mechanisms, and metal sheet, illuminated by flashes " +
      "and sparks. It appears things here are in disrepair."
    const list = "There is a Grasper Attachment here.";
    expect(describeFixedElseList(['net', 'grasper'])).toStrictEqual([ description, list ]);
    expect(describeFixedElseList(['grasper', 'net'])).toStrictEqual([ description, list ]);
  });

  it('should throw for undefined item', () => {
    expect(() => describeFixedElseList(['net', 'undefined'])).toThrow();
  });
});


describe('itemHasCarryClass', () => {
  it('should return true with a fixed-fixed comparison', () => {
    expect(itemHasCarryClass('net', CarryClass.fixed)).toBeTruthy();
  });

  it('should return false with a small-fixed comparison', () => {
    expect(itemHasCarryClass('grasper', CarryClass.fixed)).toBeFalsy();
  });

  it('should return true with a small-small comparison', () => {
    expect(itemHasCarryClass('grasper', CarryClass.small)).toBeTruthy();
  });

  it('should return false with a fixed-small comparison', () => {
    expect(itemHasCarryClass('net', CarryClass.small)).toBeFalsy();
  });

  it('should throw for undefined item', () => {
    expect(() => itemHasCarryClass('undefined', CarryClass.fixed)).toThrow();
  });
});


// resetItems
describe('resetItems', () => {
  it('should define the correct items', () => {
    expect(validItemId('net')).toBeTruthy();
    expect(validItemId('grasper')).toBeTruthy();
    expect(validItemId('undefined')).toBeTruthy();
  });
});
