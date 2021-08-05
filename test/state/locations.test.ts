import {
  longDescribeLocation,
  shortDescribeLocation,
  addContents,
  getContents,
  removeContents,
  getLocationLink,
  resetLocations,
  LocationDescription
} from '../../src/state/locations';
import { resetItems } from '../../src/state/items';


beforeEach(() => {
  resetItems();
  resetLocations();
});


describe('longDescribeLocation', () => {
  it('throws for undefined location id', () => {
    expect(() => longDescribeLocation('undefined')).toThrow();
  });
});


describe('shortDescribeLocation', () => {
  it('throws for undefined location id', () => {
    expect(() => shortDescribeLocation('undefined')).toThrow();
  });
});


describe('addContents', () => {
  it('throws for undefined location id', () => {
    expect(() => addContents('undefined', ['net'])).toThrow();
  });

  it('throws for undefined item id', () => {
    resetItems();
    expect(() => addContents('nose', ['undefined'])).toThrow();
  });
});


describe('getContents', () => {
  it('throws for undefined location id', () => {
    expect(() => getContents('undefined')).toThrow();
  });
});


describe('removeContents', () => {
  it('throws for undefined location id', () => {
    expect(() => removeContents('undefined', ['net'])).toThrow();
  });

  it('throws for undefined item id', () => {
    resetItems();
    expect(() => removeContents('nose', ['undefined'])).toThrow();
  });
});


describe('getLocationLink', () => {
  it('throws for undefined location id', () => {
    expect(() => getLocationLink('undefined', 'fore')).toThrow();
  });
});


describe('resetLocations', () => {
  
});
