import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroCardComponent } from './hero-card.component';
import { SuperHeroesService } from 'src/app/services/super-heroes.service';
import { DataDummyService } from 'src/app/services/data-dummy.service';
import { ReusableButtonComponent } from '../../ui/reusable-button/reusable-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;
  let superHeroesService: SuperHeroesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroCardComponent, ReusableButtonComponent],
      imports: [MatIconModule, MatDialogModule],
      providers: [SuperHeroesService, DataDummyService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    superHeroesService = TestBed.inject(SuperHeroesService);

    const allSuperheroes = superHeroesService.getAllSuperHeroes();
    const heroWithId2 = allSuperheroes.find((hero) => hero.id === 2);

    if (heroWithId2) {
      component.superhero = heroWithId2;
    }

    fixture.detectChanges();
  });

  it('should correctly render superhero details', () => {
    if (!component.superhero) {
      fail('Superhero not defined');
      return;
    }

    fixture.detectChanges();

    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('.title-container h2').textContent).toContain(
      component.superhero.name
    );

    expect(compiled.querySelector('.title-container h5').textContent).toContain(
      component.superhero.originalname
    );

    expect(compiled.querySelector('.card-image').getAttribute('src')).toBe(
      component.superhero.picture
    );

    expect(compiled.querySelector('.d-flex p').textContent).toContain(
      `Strength: ${component.superhero.strength}`
    );
  });
});
