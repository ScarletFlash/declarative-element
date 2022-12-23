import { isObject } from './is-object.type-guard';

describe('is-object.type-guard.ts', () => {
  it('should return false if called with primitive: boolean', () => {
    expect(isObject(true)).toBeFalsy();
    expect(isObject(false)).toBeFalsy();
  });

  it('should return false if called with primitive: number', () => {
    expect(isObject(1_000_000)).toBeFalsy();
    expect(isObject(0x000000)).toBeFalsy();
    expect(isObject(Infinity)).toBeFalsy();
    expect(isObject(NaN)).toBeFalsy();
  });

  it('should return false if called with primitive: string', () => {
    expect(isObject('To be, or not to be?')).toBeFalsy();
  });

  it('should return false if called with primitive: null', () => {
    expect(isObject(null)).toBeFalsy();
  });

  it('should return false if called with primitive: undefined', () => {
    expect(isObject(undefined)).toBeFalsy();
  });

  it('should return false if called with symbol', () => {
    expect(isObject(Symbol())).toBeFalsy();
  });

  it('should return true if called with object', () => {
    expect(isObject({})).toBeTruthy();
    expect(isObject(() => {})).toBeTruthy();
    expect(isObject([])).toBeTruthy();
  });
});
