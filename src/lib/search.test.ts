import { describe, expect, it } from 'vitest';
import { seedItems } from '@/data/items';
import { searchItems } from '@/lib/search';

describe('searchItems', () => {
  it('ranks name matches above description matches', () => {
    const query = 'Bowen Galleries';
    const results = searchItems(seedItems, query);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toContain('Bowen Galleries');
  });

  it('matches categories and locations', () => {
    expect(searchItems(seedItems, 'commercial').length).toBeGreaterThan(0);
    expect(searchItems(seedItems, 'newtown').length).toBeGreaterThan(0);
  });

  it('returns everything on an empty query', () => {
    expect(searchItems(seedItems, '  ').length).toBe(seedItems.length);
  });

  it('excludes opted-out items from results', () => {
    const items = [{ ...seedItems[0], optOut: true }];
    expect(searchItems(items, 'te papa')).toEqual([]);
  });
});
