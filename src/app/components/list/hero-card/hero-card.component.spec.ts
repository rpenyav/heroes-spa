import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroCardComponent } from './hero-card.component';
import { SuperHeroesService } from 'src/app/services/super-heroes.service';
import { DataDummyService } from 'src/app/services/data-dummy.service';
import { ReusableButtonComponent } from '../../ui/reusable-button/reusable-button.component';
import { MatIconModule } from '@angular/material/icon';

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;
  let superHeroesService: SuperHeroesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroCardComponent, ReusableButtonComponent],
      imports: [MatIconModule],
      providers: [SuperHeroesService, DataDummyService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    superHeroesService = TestBed.inject(SuperHeroesService);

    // Obtén todos los superhéroes de una página. Puedes cambiar el número de página según sea necesario.
    const allSuperheroes = superHeroesService.getAllSuperHeroes();
    const heroWithId2 = allSuperheroes.find((hero) => hero.id === 2);

    if (heroWithId2) {
      component.superhero = heroWithId2;
    }

    fixture.detectChanges();
  });

  it('should correctly render superhero details', () => {
    // Asegúrate de que superhero está definido antes de continuar
    if (!component.superhero) {
      fail('Superhero not defined');
      return;
    }

    fixture.detectChanges(); // Actualizar la vista con los datos nuevos

    const compiled = fixture.nativeElement; // Elemento raíz del componente

    // Comprobar que el nombre del superhéroe se renderiza correctamente
    expect(compiled.querySelector('.title-container h2').textContent).toContain(
      component.superhero.name
    );

    // Comprobar que el nombre original del superhéroe se renderiza correctamente
    expect(compiled.querySelector('.title-container h5').textContent).toContain(
      component.superhero.originalname
    );

    // Comprobar que la imagen del superhéroe se renderiza correctamente
    expect(compiled.querySelector('.card-image').getAttribute('src')).toBe(
      component.superhero.picture
    );

    // Comprobar que la fuerza del superhéroe se renderiza correctamente
    expect(compiled.querySelector('.d-flex p').textContent).toContain(
      `Strength: ${component.superhero.strength}`
    );
  });
});
