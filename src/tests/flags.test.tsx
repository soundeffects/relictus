import React from 'react';
import { render } from '@testing-library/react';
import * as FlagState from '../state/FlagState';

beforeEach(() => {
  FlagState.testSetup();
});


// score
test('score value updates', () => {
  expect(FlagState.score).toEqual(0);
  FlagState.createFlag('new flag', [], 1);
  FlagState.activateFlag('new flag');
  expect(FlagState.score).toEqual(1);
});


// activateFlag
test('activateFlag executes', () => {
  FlagState.activateFlag('new flag');
});

test('activateFlag does not find flag, returns false', () => {
  expect(FlagState.activateFlag('new flag')).toBeFalsy();
});

test('activateFlag finds flag, returns true', () => {
  FlagState.createFlag('new flag');
  expect(FlagState.activateFlag('new flag')).toBeTruthy();
});

test('activateFlag finds dependencies, returns false', () => {
  FlagState.createFlag('new flag');
  FlagState.createFlag('another flag', ['new flag']);
  expect(FlagState.activateFlag('another flag')).toBeFalsy();
});

test('activateFlag finds dependencies, returns true', () => {
  FlagState.createFlag('new flag');
  FlagState.createFlag('another flag', ['new flag']);
  FlagState.activateFlag('new flag');
  expect(FlagState.activateFlag('another flag')).toBeTruthy();
});

test('activateFlag finds multiple dependencies, returns false', () => {
  FlagState.createFlag('new flag');
  FlagState.createFlag('another flag');
  FlagState.createFlag('final flag', ['new flag', 'another flag']);
  FlagState.activateFlag('new flag');
  expect(FlagState.activateFlag('final flag')).toBeFalsy();
});


// flagIsActive
test('flagIsActive does not find', () => {
  expect(FlagState.flagIsActive('new flag')).toBeFalsy();
});

test('flagIsActive finds, returns false', () => {
  FlagState.createFlag('new flag');
  expect(FlagState.flagIsActive('new flag')).toBeFalsy();
});

test('flagIsActive finds, returns true', () => {
  FlagState.createFlag('new flag');
  FlagState.activateFlag('new flag');
  expect(FlagState.flagIsActive('new flag')).toBeTruthy();
});


// createFlag
test('createFlag 1 arg execution', () => {
  FlagState.createFlag('new flag');
  expect(FlagState.activateFlag('new flag')).toBeTruthy();
});

test('createFlag 2 arg execution', () => {
  FlagState.createFlag('new flag', []);
  expect(FlagState.activateFlag('new flag')).toBeTruthy();
});

test('createFlag 3 arg execution', () => {
  FlagState.createFlag('new flag', [], 0);
  expect(FlagState.activateFlag('new flag')).toBeTruthy();
});

test('createFlag with dependencies', () => {
  FlagState.createFlag('new flag');
  FlagState.createFlag('another flag', ['new flag']);
  FlagState.activateFlag('new flag');
  expect(FlagState.activateFlag('another flag')).toBeTruthy();
});

test('createFlag with score', () => {
  FlagState.createFlag('new flag', [], 1);
  FlagState.activateFlag('new flag');
  expect(FlagState.score).toEqual(1);
});


// resetFlags
test('resetFlags deactivates multiple flags', () => {
  FlagState.createFlag('new flag');
  FlagState.createFlag('another flag');
  FlagState.createFlag('final flag');
  FlagState.activateFlag('new flag');
  FlagState.activateFlag('another flag');

  FlagState.resetFlags();

  expect(FlagState.flagIsActive('new flag')).toBeFalsy();
  expect(FlagState.flagIsActive('another flag')).toBeFalsy();
  expect(FlagState.flagIsActive('final flag')).toBeFalsy();
})
