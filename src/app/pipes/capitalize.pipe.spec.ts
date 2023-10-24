import { CapitalizePipe } from './capitalize.pipe';
import { TestBed } from '@angular/core/testing';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapitalizePipe],
    });
    pipe = new CapitalizePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string if value is empty', () => {
    const result = pipe.transform('');
    expect(result).toBe('');
  });

  it('should return the same string if first character is already uppercase', () => {
    const result = pipe.transform('Angular');
    expect(result).toBe('Angular');
  });

  it('should return the string with the first character capitalized', () => {
    const result = pipe.transform('angular');
    expect(result).toBe('Angular');
  });

  it('should return empty string if value is null', () => {
    const result = pipe.transform(null as any);
    expect(result).toBe('');
  });

  it('should return empty string if value is undefined', () => {
    const result = pipe.transform(undefined as any);
    expect(result).toBe('');
  });
});
