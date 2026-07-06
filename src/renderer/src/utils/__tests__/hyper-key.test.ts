import { describe, expect, it } from 'vitest';

import { formatShortcutForDisplay } from '../hyper-key';

describe('formatShortcutForDisplay', () => {
  it('renders common modifiers as keyboard symbols and uppercases single letter keys', () => {
    expect(formatShortcutForDisplay('cmd+shift+p')).toBe('⌘ + ⇧ + P');
  });

  it('renders navigation and deletion keys with display glyphs', () => {
    expect(formatShortcutForDisplay('control+option+arrowdown+delete')).toBe('⌃ + ⌥ + ↓ + ⌫');
  });

  it('keeps the hyper modifier readable', () => {
    expect(formatShortcutForDisplay('hyper+space')).toBe('Hyper + space');
  });
});
