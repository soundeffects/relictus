import * as assert from 'assert';
import * as FlagState from '../src/state/flags';

beforeEach(() => {
  FlagState.resetFlags();
});

describe('FlagState', () => {
  describe('activateFlag', () => {
    
  });

  describe('flagIsActive', () => {
    
  });

  describe('resetFlags', () => {
    
  });
});
/*
// activateFlag
test('activateFlag executes', () => {
  FlagState.activateFlag('new flag');
});

test('activateFlag does not find flag, returns false', () => {
  assert.isFalse(FlagState.activateFlag('new flag'));
});

test('activateFlag finds flag and activates', () => {
  expect(FlagState.activateFlag('firstView')).toBeTruthy();
});

test('activateFlag updates score', () => {
  expect(FlagState.score).toEqual(0);
  FlagState.activateFlag('firstView');
  expect(FlagState.score).toEqual(1);
})

test('activateFlag does not activate twice', () => {
  FlagState.activateFlag('firstView');
  expect(FlagState.activateFlag('firstView')).toBeFalsy();
});

test('activateFlag finds dependencies, returns false', () => {
  expect(FlagState.activateFlag('landerConstructed')).toBeFalsy();
});

test('activateFlag finds dependencies, returns true', () => {
  FlagState.activateFlag('grasperConstructed');
  expect(FlagState.activateFlag('landerConstructed')).toBeTruthy();
});

test('activateFlag finds multiple dependencies, returns false', () => {
  FlagState.activateFlag('bayOpened');
  expect(FlagState.activateFlag('escaped')).toBeFalsy();
});


// flagIsActive
test('flagIsActive does not find', () => {
  expect(FlagState.flagIsActive('new flag')).toBeUndefined();
});

test('flagIsActive finds, returns false', () => {
  expect(FlagState.flagIsActive('firstView')).toBeFalsy();
});

test('flagIsActive finds, returns true', () => {
  FlagState.activateFlag('firstView');
  expect(FlagState.flagIsActive('firstView')).toBeTruthy();
});


// resetFlags
test('resetFlags deactivates multiple flags', () => {
  FlagState.activateFlag('firstView');
  FlagState.activateFlag('secondBot');
  
  expect(FlagState.flagIsActive('firstView')).toBeTruthy();
  expect(FlagState.flagIsActive('secondBot')).toBeTruthy();
  expect(FlagState.score).toEqual(2);

  FlagState.resetFlags();

  expect(FlagState.flagIsActive('firstView')).toBeFalsy();
  expect(FlagState.flagIsActive('secondBot')).toBeFalsy();
  expect(FlagState.score).toEqual(0);
});*/
