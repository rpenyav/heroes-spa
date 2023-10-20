import { TestBed } from '@angular/core/testing';
import { DataDummyService } from './data-dummy.service';
import { SuperHeroesService } from './super-heroes.service';
import { XMenCharacter } from '../model/characters';

describe('SuperHeroesService', () => {
  let service: SuperHeroesService;
  let mockDataDummyService: {
    getTotalPages: { and: { returnValue: (arg0: number) => void } };
    getAllData: { and: { returnValue: (arg0: XMenCharacter[]) => void } };
  };

  beforeEach(() => {
    mockDataDummyService = jasmine.createSpyObj('DataDummyService', [
      'getTotalPages',
      'getAllData',
    ]);

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
    const mockData: XMenCharacter[] = [
      // (Tu array de superhéroes)
    ];

    mockDataDummyService.getAllData.and.returnValue(mockData);
    const allData = service.getAllSuperHeroes();
    expect(allData.length).toBe(mockData.length);
    expect(allData).toEqual(mockData);
  });

  // Aquí puedes agregar más pruebas para métodos como buscarSuperHeroes
});
