import { TestBed } from '@angular/core/testing';
import { FilterPipe } from './filter-pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterPipe],
    });
    pipe = new FilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original items if no search text is provided', () => {
    const items = [
      { name: 'Wolverine' },
      { name: 'Jane' },
      { name: 'Charles' },
    ];
    const filtered = pipe.transform(items, '');
    expect(filtered).toEqual(items);
  });

  it('should return an empty array if items are null', () => {
    const items = null as any;
    const filtered = pipe.transform(items, 'John');
    expect(filtered).toEqual([]);
  });

  it('should filter items by name', () => {
    const items = [
      { name: 'Wolverine' },
      { name: 'Jane' },
      { name: 'Charles' },
    ];
    const searchText = 'Wolverine';
    const filtered = pipe.transform(items, searchText);
    expect(filtered).toEqual([{ name: 'Wolverine' }]);
  });

  it('should be case insensitive', () => {
    const items = [
      { name: 'Wolverine' },
      { name: 'Jane' },
      { name: 'Charles' },
    ];
    const searchText = 'Wolverine';
    const filtered = pipe.transform(items, searchText);
    expect(filtered).toEqual([{ name: 'Wolverine' }]);
  });
});
