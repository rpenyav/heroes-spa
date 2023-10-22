import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ListComponent } from './list.component';
import { DataDummyService } from '../../services/data-dummy.service';
import { AppModule } from '../../app.module';
import { SuperHeroesService } from '../../services/super-heroes.service';
import { XMenCharacter } from 'src/app/model/characters';
import { Subject, of } from 'rxjs';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const dataUpdated$ = new Subject<boolean>();
  type MockSuperHeroesService = jasmine.SpyObj<SuperHeroesService>;
  let mockSuperHeroesService: MockSuperHeroesService;

  const mockSuperHeroesData: XMenCharacter[] = [
    {
      id: 1,
      name: 'Magneto',
      originalname: 'Magnus',
      strength: 90,
      class: 'Hero',
      description: 'Magnetic powers',
      picture: 'some-url',
      powers: [],
    },
    {
      id: 2,
      name: 'X Professor',
      originalname: 'Charles Xavier',
      strength: 80,
      class: 'Hero',
      description: 'Telepathy',
      picture: 'some-url',
      powers: [],
    },
  ];

  beforeEach(() => {
    mockSuperHeroesService = jasmine.createSpyObj('SuperHeroesService', [
      'getTotalPages',
      'getAllSuperHeroes',
      'getElementsPerPage',
    ]);
    mockSuperHeroesService.dataUpdated$ = dataUpdated$.asObservable();

    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [AppModule],
      providers: [
        DataDummyService,
        { provide: SuperHeroesService, useValue: mockSuperHeroesService },
      ],
    }).compileComponents();

    mockSuperHeroesService.getAllSuperHeroes.and.returnValue(
      mockSuperHeroesData
    );
    mockSuperHeroesService.getTotalPages.and.returnValue(5);
    mockSuperHeroesService.getElementsPerPage.and.returnValue(8);

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with correct data', fakeAsync(() => {
    tick();
    expect(component.superheroes.length).toBe(mockSuperHeroesData.length);
  }));

  it('should call loadData on ngOnInit and load super heroes', () => {
    const loadDataSpy = spyOn(component, 'loadData').and.callThrough();
    component.ngOnInit();
    expect(loadDataSpy).toHaveBeenCalled();
    expect(mockSuperHeroesService.getAllSuperHeroes).toHaveBeenCalled();
  });

  it('should increment page number and reload data when nextPage is called', () => {
    component.actualPage = 1;
    component.totalPages = 10;
    component.nextPage();
    expect(component.actualPage).toBe(2);
  });

  it('should decrement page number and reload data when previousPage is called', () => {
    component.actualPage = 2;
    component.previousPage();
    expect(component.actualPage).toBe(1);
  });
});
