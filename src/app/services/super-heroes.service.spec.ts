import { TestBed } from '@angular/core/testing';
import { DataDummyService } from './data-dummy.service';
import { SuperHeroesService } from './super-heroes.service';
import { XMenCharacter } from '../model/characters';

describe('SuperHeroesService', () => {
  let service: SuperHeroesService;
  let mockDataDummyService: jasmine.SpyObj<DataDummyService>;

  beforeEach(() => {
    mockDataDummyService = jasmine.createSpyObj('DataDummyService', [
      'getTotalPages',
      'getAllData',
      'getElementsPerPage',
    ]);
    mockDataDummyService.elementsPerPage = 8;
    TestBed.configureTestingModule({
      providers: [
        { provide: DataDummyService, useValue: mockDataDummyService },
        SuperHeroesService,
      ],
    });

    service = TestBed.inject(SuperHeroesService);
  });

  it('should return correct total pages', () => {
    mockDataDummyService.getTotalPages.and.returnValue(3);
    expect(service.getTotalPages()).toBe(3);
  });

  it('should return all super heroes', () => {
    const mockData: XMenCharacter[] = [];
    mockDataDummyService.getAllData.and.returnValue(mockData);
    const allData = service.getAllSuperHeroes();
    expect(allData.length).toBe(mockData.length);
    expect(allData).toEqual(mockData);
  });

  it('should return correct elements per page', () => {
    expect(service.getElementsPerPage()).toBe(8);
  });

  it('should return a hero by its ID', () => {
    const mockHeroId = 1;
    const mockHero: XMenCharacter = {
      id: mockHeroId,
      name: 'HeroName',
      originalname: 'Original HeroName',
      description: 'Hero description',
      strength: 5,
      class: 'X',
      picture: 'url-to-picture',
      powers: [{ name: 'Superstrength', description: 'Very strong' }],
    };

    mockDataDummyService.getAllData.and.returnValue([mockHero]);
    expect(service.getHeroeById(mockHeroId)).toEqual(mockHero);
  });

  it('should save powers to local storage', () => {
    const powers = ['flying', 'teleporting'];
    service.savePowers(powers);
    expect(JSON.parse(localStorage.getItem('powers') || '')).toEqual(powers);
  });

  it('should load powers from local storage', (done) => {
    const powers = ['flying', 'teleporting'];
    localStorage.setItem('powers', JSON.stringify(powers));

    service.loadPowers().subscribe((loadedPowers) => {
      expect(loadedPowers).toEqual(powers);
      done();
    });
  });

  it('should clear powers from local storage', () => {
    localStorage.setItem('powers', JSON.stringify(['flying', 'teleporting']));
    service.clearPowers();
    expect(localStorage.getItem('powers')).toBeNull();
  });
});
