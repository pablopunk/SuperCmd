import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { normalizeBaseColorHex, DEFAULT_BASE_COLOR } from '../src/renderer/src/utils/base-color';

describe('project smoke checks', () => {
  it('exposes a test script and expected package metadata', () => {
    const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

    expect(packageJson.name).toBe('supercmd');
    expect(packageJson.scripts).toMatchObject({
      test: 'vitest run',
    });
    expect(packageJson.main).toBe('dist/main/main.js');
  });

  it('normalizes base colors without loading Electron modules', () => {
    expect(DEFAULT_BASE_COLOR).toBe('#101113');
    expect(normalizeBaseColorHex('#ABC')).toBe('#aabbcc');
    expect(normalizeBaseColorHex('not-a-color')).toBe(DEFAULT_BASE_COLOR);
  });
});
