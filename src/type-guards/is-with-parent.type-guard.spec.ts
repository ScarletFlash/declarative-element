import type { WithParentTrait } from './../declarations/traits/with-parent.trait';
import { isWithParent } from './is-with-parent.type-guard';

describe('is-with-parent.type-guard.ts', () => {
  it('should return false if called with primitive', () => {
    expect(isWithParent(null)).toBeFalsy();
  });

  it('should return true if called with object compatible with { parent: HTMLElement }', () => {
    const parent: HTMLElement = document.createElement('article');

    const compatibleObject: WithParentTrait = {
      parent,
    };

    expect(isWithParent(compatibleObject)).toBeTruthy();
  });

  it('should return false if called with object incompatible with { parent: HTMLElement }', () => {
    const incompatibleObject: Record<keyof WithParentTrait, string[]> = {
      parent: ['document.createElement("i")'],
    };

    expect(isWithParent(incompatibleObject)).toBeFalsy();
  });
});
