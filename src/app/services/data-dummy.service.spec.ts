import { TestBed } from '@angular/core/testing';
import { DataDummyService } from './data-dummy.service';

describe('DataDummyService', () => {
  let service: DataDummyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataDummyService],
    });
    service = TestBed.inject(DataDummyService);
  });

  it('should have initial elements per page as 8', () => {
    expect(service.elementsPerPage).toEqual(8);
  });

  it('should have initial total elements as 20', () => {
    expect(service['totalElements']).toEqual(20); // Acceder a la propiedad privada
  });

  it('should return correct total pages', () => {
    expect(service.getTotalPages()).toEqual(3); // 20 total elements, 8 per page, should be 3 pages
  });

  it('should update hero by id', () => {
    const heroId = 1;
    const updatedHero = { id: 1, name: 'Updated Hero' };
    service.updateHero(heroId, updatedHero);
    const allData = service.getAllData();
    const updatedHeroInData = allData.find((hero) => hero.id === heroId);
    expect(updatedHeroInData).toEqual(updatedHero);
  });

  it('should delete hero by id', () => {
    const heroId = 1;
    service.deleteHero(heroId);
    const allData = service.getAllData();
    const deletedHeroInData = allData.find((hero) => hero.id === heroId);
    expect(deletedHeroInData).toBeUndefined();
  });
});
