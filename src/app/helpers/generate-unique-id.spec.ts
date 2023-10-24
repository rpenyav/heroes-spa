import { generateUniqueId } from './generate-unique-id';

describe('generateUniqueId', () => {
  it('should return a number', () => {
    const id = generateUniqueId();
    expect(typeof id).toBe('number');
  });

  it('should return a number within the expected range', () => {
    const id = generateUniqueId();
    expect(id).toBeGreaterThanOrEqual(0);
    expect(id).toBeLessThanOrEqual(999);
  });

  it('should generate different ids', () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) {
      ids.add(generateUniqueId());
    }
    // Aunque no podemos garantizar que todos los IDs sean únicos debido a la naturaleza aleatoria,
    // si generamos un número suficientemente grande de ellos, esperaríamos que al menos algunos sean diferentes.
    expect(ids.size).toBeGreaterThan(1);
  });
});
