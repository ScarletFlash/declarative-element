import type { WithInnerText } from './../declarations/traits/with-inner-text.trait';
import { isWithInnerText } from './is-with-inner-text.type-guard';

describe('is-with-inner-text.type-guard.ts', () => {
  it('should return false if called with primitive', () => {
    expect(isWithInnerText(null)).toBeFalsy();
  });

  it('should return true if called with object compatible with { innerText: string }', () => {
    const compatibleObject: WithInnerText = {
      innerText: 'compatible',
    };

    expect(isWithInnerText(compatibleObject)).toBeTruthy();
  });

  it('should return false if called with object incompatible with { innerText: string }', () => {
    const incompatibleObject: Record<keyof WithInnerText, string[]> = {
      innerText: ['incompatible'],
    };

    expect(isWithInnerText(incompatibleObject)).toBeFalsy();
  });
});
