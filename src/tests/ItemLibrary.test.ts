import Item, { CarryingClass, lookupItem, resetItemLibrary } from '../state/ItemLibrary';
import { filterDescriptionsAll, filterDescriptionsBySeen, filterDescriptionsByName } from '../state/Descript';

beforeEach(() => {
  resetItemLibrary();
});


// Item
test('Item constructor 3 arg executes', () => {
  const item: Item = new Item(['name'], 'description', CarryingClass.small);
});

test('Correctly returns true for canCarry', () => {
  const item: Item = new Item(['name'], 'description', CarryingClass.small);
  expect(item.canCarry([CarryingClass.small, CarryingClass.medium])).toBeTruthy();
});

test('Correctly returns false for canCarry', () => {
  const item: Item = new Item(['name'], 'description', CarryingClass.fixed);
  expect(item.canCarry([CarryingClass.small, CarryingClass.medium])).toBeFalsy();
});


// lookupItem
test('lookupItem returns undefined when doesnt exist', () => {
  expect(lookupItem('random_item')).toBeUndefined();
});

test('lookupItem returns the item with primary name', () => {
  expect(lookupItem('rail')).toBeInstanceOf(Item);
});

test('lookupItem returns the item with secondary name', () => {
  expect(lookupItem('track')).toBeInstanceOf(Item);
})


// resetItemLibrary
test('resetItemLibrary creates rails with description', () => {
  const item: Item = lookupItem('rail') as Item;
  expect(item.matchName('track')).toBeTruthy();
  expect(item.describe(filterDescriptionsAll, null)).not.toBeNull();
});

test('resetItemLibrary creates paper with description', () => {
  const item: Item = lookupItem('paper') as Item;
  expect(item.matchName('slip')).toBeTruthy();
  expect(item.matchName('note')).toBeTruthy();

  const description: string = item.describe(filterDescriptionsAll, null) as string;
  expect(description.indexOf('\n')).toBeGreaterThan(0);
});


// filters
test('filter by seen limits item description', () => {
  const item: Item = lookupItem('rail') as Item;
  expect(item.describe(filterDescriptionsBySeen, null)).not.toBeNull();
  expect(item.describe(filterDescriptionsBySeen, null)).toBeNull();
});

test('filter by name limits item description', () => {
  const item: Item = lookupItem('rail') as Item;
  expect(item.describe(filterDescriptionsByName, 'rail')).not.toBeNull();
  expect(item.describe(filterDescriptionsByName, 'other')).toBeNull();
})
