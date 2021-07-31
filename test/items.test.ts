import {
  nameItem,
  describeItem,
  itemIsPlural,
  itemHasCarryClass,
  resetItems,
  CarryClass
} from '../src/state/items';


beforeEach(() => {
  resetItems();
});


// nameItem
test('name item gives correct name', () => {
  expect(nameItem('net')).toBe('Net Machinery');
});


// describeItem


// itemIsPlural


// itemHasCarryClass


// resetItems
