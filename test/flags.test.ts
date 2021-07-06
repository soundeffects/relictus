import * as FlagState from '../src/state/flags';

beforeEach(() => {
  FlagState.resetFlags();
})

// activateFlag
test('activateFlag executes', () => {
  FlagState.activateFlag('new flag');
});

test('activateFlag does not find flag, returns false', () => {
  expect(FlagState.activateFlag('new flag')).toBeFalsy();
});

test('activateFlag finds flag and activates', () => {
  expect(FlagState.activateFlag('first_view')).toBeTruthy();
});

test('activateFlag updates score', () => {
  expect(FlagState.score).toEqual(0);
  FlagState.activateFlag('first_view');
  expect(FlagState.score).toEqual(1);
})

test('activateFlag does not activate twice', () => {
  FlagState.activateFlag('first_view');
  expect(FlagState.activateFlag('first_view')).toBeFalsy();
});

test('activateFlag finds dependencies, returns false', () => {
  expect(FlagState.activateFlag('lander_construct')).toBeFalsy();
});

test('activateFlag finds dependencies, returns true', () => {
  FlagState.activateFlag('grasper_attach');
  expect(FlagState.activateFlag('lander_construct')).toBeTruthy();
});

test('activateFlag finds multiple dependencies, returns false', () => {
  FlagState.activateFlag('bay_open');
  expect(FlagState.activateFlag('escaped')).toBeFalsy();
});


// flagIsActive
test('flagIsActive does not find', () => {
  expect(FlagState.flagIsActive('new flag')).toBeFalsy();
});

test('flagIsActive finds, returns false', () => {
  expect(FlagState.flagIsActive('firstView')).toBeFalsy();
});

test('flagIsActive finds, returns true', () => {
  FlagState.activateFlag('first_view');
  expect(FlagState.flagIsActive('first_view')).toBeTruthy();
});


// resetFlags
test('resetFlags deactivates multiple flags', () => {
  FlagState.activateFlag('first_view');
  FlagState.activateFlag('second_bot');
  
  expect(FlagState.flagIsActive('first_view')).toBeTruthy();
  expect(FlagState.flagIsActive('second_bot')).toBeTruthy();
  expect(FlagState.score).toEqual(2);

  FlagState.resetFlags();

  expect(FlagState.flagIsActive('first_view')).toBeFalsy();
  expect(FlagState.flagIsActive('second_bot')).toBeFalsy();
  expect(FlagState.score).toEqual(0);
});
