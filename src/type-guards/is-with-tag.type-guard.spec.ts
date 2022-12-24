import type { WithTagNameTrait } from '../declarations/traits/with-tag-name.trait';
import { isWithTag } from './is-with-tag.type-guard';

describe('is-with-tag.type-guard.ts', () => {
  it('should return false if called with primitive', () => {
    expect(isWithTag(null)).toBeFalsy();
  });

  it('should return true if called with object compatible with { tagName: string }', () => {
    const compatibleObject: WithTagNameTrait = {
      tagName: 'some-tag',
    };

    expect(isWithTag(compatibleObject)).toBeTruthy();
  });

  it('should return false if called with object incompatible with { tagName: string }', () => {
    const incompatibleObject: Record<keyof WithTagNameTrait, string[]> = {
      tagName: ['incompatible'],
    };

    expect(isWithTag(incompatibleObject)).toBeFalsy();
  });
});
