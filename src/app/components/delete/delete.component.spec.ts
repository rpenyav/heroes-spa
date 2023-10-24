import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { DeleteComponent } from './delete.component';
import { SuperHeroesService } from '../../services/super-heroes.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { XMenCharacter } from 'src/app/model/characters';
import { LoaderSpinnerComponent } from '../ui/loader-spinner/loader-spinner.component';
import { ReusableButtonComponent } from '../ui/reusable-button/reusable-button.component';

describe('DeleteComponent', () => {
  let component: DeleteComponent;
  let fixture: ComponentFixture<DeleteComponent>;
  let mockSuperHeroesService: jasmine.SpyObj<SuperHeroesService>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<DeleteComponent>>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockSuperHeroesService = jasmine.createSpyObj('SuperHeroesService', [
      'getHeroeById',
      'deleteHeroeById',
    ]);
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSuperHeroesService.dataUpdatedSource = new BehaviorSubject<boolean>(
      false
    );

    TestBed.configureTestingModule({
      declarations: [
        DeleteComponent,
        LoaderSpinnerComponent,
        ReusableButtonComponent,
      ],
      providers: [
        { provide: SuperHeroesService, useValue: mockSuperHeroesService },
        { provide: MatDialogRef, useValue: mockDialogRef },

        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize super hero subscription', () => {
    const hero: XMenCharacter = {
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
    mockSuperHeroesService.getHeroeById.and.returnValue(hero);
    const heroSubject = new Subject<number>();
    mockSuperHeroesService.selectedSuperHeroId$ = heroSubject.asObservable();

    fixture.detectChanges();

    heroSubject.next(1);

    expect(component.superhero).toEqual(hero);
  });

  it('should confirm delete', fakeAsync(() => {
    mockSuperHeroesService.deleteHeroeById.and.returnValue(true);
    component.superhero = {
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

    mockSuperHeroesService.dataUpdatedSource.next(true);

    component.confirmDelete();
    tick(2000);

    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'The hero has been deleted successfully',
      'OK',
      jasmine.any(Object)
    );
    expect(mockDialogRef.close).toHaveBeenCalled();
  }));

  it('should cancel delete', () => {
    component.cancelDelete();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should successfully delete superhero and navigate when deleteFromDetail is true', fakeAsync(() => {
    component.superhero = {
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
    component.deleteFromDetail = true; // Para activar la navegación
    mockSuperHeroesService.deleteHeroeById.and.returnValue(true);

    component.confirmDelete();

    tick(1000); // Avanza el tiempo simulado en 1 segundo

    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'The hero has been deleted successfully',
      'OK',
      jasmine.any(Object)
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list']); // Asegurarse de que se ha navegado
    expect(mockDialogRef.close).toHaveBeenCalled();
  }));

  it('should fail to delete superhero and show error', fakeAsync(() => {
    component.superhero = {
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
    mockSuperHeroesService.deleteHeroeById.and.returnValue(false); // Simulamos un error

    component.confirmDelete();

    tick(1000); // Avanza el tiempo simulado en 1 segundo

    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Error deleting hero',
      'OK',
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar'],
      }
    );
    expect(mockDialogRef.close).toHaveBeenCalled();
  }));
});
