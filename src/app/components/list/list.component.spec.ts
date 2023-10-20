import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaComponent } from './lista.component';
import { DataDummyService } from '../../services/data-dummy.service';
import { AppModule } from '../../app.module';
import { LayoutComponent } from '../../layout/layout/layout.component';
import { ReusableButtonComponent } from '../ui/reusable-button/reusable-button.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SuperHeroesService } from '../../services/super-heroes.service';

describe('ListaComponent', () => {
  let component: ListaComponent;
  let fixture: ComponentFixture<ListaComponent>;
  let cargarDatosSpy: jasmine.Spy;

  const mockSuperHeroesData = [
    { id: 1, name: 'Magneto' },
    { id: 2, name: 'X Professor' },
  ];

  let mockSuperHeroesService = jasmine.createSpyObj('SuperHeroesService', [
    'getTotalPages',
    'getAllSuperHeroes',
    'getElementsPerPage',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaComponent, LayoutComponent, ReusableButtonComponent],
      imports: [AppModule, NoopAnimationsModule],
      providers: [
        DataDummyService,
        { provide: SuperHeroesService, useValue: mockSuperHeroesService },
      ],
    }).compileComponents();
    mockSuperHeroesService.getAllSuperHeroes.and.returnValue([
      mockSuperHeroesData,
    ]);
    mockSuperHeroesService.getTotalPages.and.returnValue(5);
    mockSuperHeroesService.getElementsPerPage.and.returnValue(8);

    fixture = TestBed.createComponent(ListaComponent);
    component = fixture.componentInstance;
    cargarDatosSpy = spyOn(component, 'loadData').and.callThrough();
    fixture.detectChanges();
  });

  it('should call loadData on ngOnInit and load super heroes', () => {
    expect(cargarDatosSpy).toHaveBeenCalled();
    expect(mockSuperHeroesService.getAllSuperHeroes).toHaveBeenCalled();
  });

  it('should increment page number and reload data when nextPage is called', () => {
    component.actualPage = 1;
    component.totalPages = 10;
    cargarDatosSpy.calls.reset();
    component.nextPage();
    expect(component.actualPage).toBe(2);
    expect(cargarDatosSpy).toHaveBeenCalled();
  });

  it('should decrement page number and reload data when previousPage is called', () => {
    component.actualPage = 2;
    component.previousPage();
    expect(component.actualPage).toBe(1);
    expect(mockSuperHeroesService.getAllSuperHeroes).toHaveBeenCalled();
  });

  it('should update window width on window resize', () => {
    const resizeEvent = new Event('resize');
    spyOnProperty(window, 'innerWidth').and.returnValue(800);
    window.dispatchEvent(resizeEvent);
    expect(component.windowWidth).toBe(800);
  });
});
