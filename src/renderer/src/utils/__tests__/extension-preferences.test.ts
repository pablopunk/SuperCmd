import { describe, expect, it } from 'vitest';

import {
  getMenuBarCommandKey,
  isMissingArgumentValue,
  isMissingPreferenceValue,
  toScriptArgumentMapFromArray,
} from '../extension-preferences';

describe('extension preference helpers', () => {
  it('normalizes menu bar command keys for stable storage lookup', () => {
    expect(getMenuBarCommandKey('  My Extension  ', '  Run Thing  ')).toBe('my extension/run thing');
  });

  it('treats blank text preferences as missing but keeps unchecked required checkboxes valid', () => {
    expect(isMissingPreferenceValue({ name: 'token', type: 'password', required: true } as any, '   ')).toBe(true);
    expect(isMissingPreferenceValue({ name: 'enabled', type: 'checkbox', required: true } as any, false)).toBe(false);
  });

  it('detects missing required command arguments', () => {
    expect(isMissingArgumentValue({ name: 'query', required: true } as any, '')).toBe(true);
    expect(isMissingArgumentValue({ name: 'query', required: false } as any, '')).toBe(false);
  });

  it('maps script arguments by numeric argument name order', () => {
    const command = {
      commandArgumentDefinitions: [
        { name: 'argument2' },
        { name: 'argument1' },
      ],
    } as any;

    expect(toScriptArgumentMapFromArray(command, ['first', 'second'])).toEqual({
      argument1: 'first',
      argument2: 'second',
    });
  });
});
