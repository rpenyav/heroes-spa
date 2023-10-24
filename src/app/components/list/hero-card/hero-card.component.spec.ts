import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroCardComponent } from './hero-card.component';
import { SuperHeroesService } from 'src/app/services/super-heroes.service';
import { ReusableButtonComponent } from '../../ui/reusable-button/reusable-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;
  let dialog: MatDialog;
  let superHeroesService: SuperHeroesService;

  const mockSuperHero = {
    id: 20,
    name: 'Beast',
    originalname: 'Hank McCoy',
    description:
      'A mutant with superhuman agility, strength, and an ape-like appearance, known for his intelligence.',
    strength: 10,
    class: 'good',
    picture:
      'https://res.cloudinary.com/dazfoa93m/image/upload/t_apoc/v1697821268/xmen/wfb1jyj3vo6awnhzrsxj.webp',
    powers: [
      {
        name: 'Superhuman Agility',
        description: 'Possess superhuman agility and reflexes',
      },
    ],
  };

  const mockSuperHeroesService = {
    getAllSuperHeroes: () => [mockSuperHero],
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SuperHeroesService', [
      'setSelectedSuperHeroId',
    ]);

    await TestBed.configureTestingModule({
      declarations: [HeroCardComponent, ReusableButtonComponent],
      imports: [MatIconModule, MatDialogModule],
      providers: [{ provide: SuperHeroesService, useValue: spy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;

    component.superhero = mockSuperHero;

    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    superHeroesService = TestBed.inject(SuperHeroesService);

    component.superhero = mockSuperHero;

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

  it('should open the edit modal', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({
      afterClosed: of({}),
      close: null,
    });
    dialogRefSpyObj.componentInstance = { body: '' };
    spyOn(dialog, 'open').and.returnValue(dialogRefSpyObj);

    component.openEditModal(mockSuperHero.id);

    expect(dialog.open).toHaveBeenCalled();
    expect(superHeroesService.setSelectedSuperHeroId).toHaveBeenCalledWith(
      mockSuperHero.id
    );
  });

  it('should open the delete modal', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({
      afterClosed: of({}),
      close: null,
    });
    dialogRefSpyObj.componentInstance = { body: '' };
    spyOn(dialog, 'open').and.returnValue(dialogRefSpyObj);

    component.openDeleteModal(mockSuperHero.id);

    expect(dialog.open).toHaveBeenCalled();
    expect(superHeroesService.setSelectedSuperHeroId).toHaveBeenCalledWith(
      mockSuperHero.id
    );
  });

  it('should update imageLoaded to true when onImageLoad is called', () => {
    component.onImageLoad();
    expect(component.imageLoaded).toBeTrue();
  });

  it('should update superhero picture when onImageError is called', () => {
    component.onImageError();
    expect(component.superhero.picture).toBe('assets/no-image-big.jpg');
  });
});
