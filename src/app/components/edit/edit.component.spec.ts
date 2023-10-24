import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { EditComponent } from './edit.component';
import { SuperHeroesService } from '../../services/super-heroes.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { LoaderSpinnerComponent } from '../ui/loader-spinner/loader-spinner.component';
import { AddImageComponent } from '../add/add-image/add-image.component';
import { ReusableButtonComponent } from '../ui/reusable-button/reusable-button.component';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let superHeroesService: SuperHeroesService;
  let snackBar: MatSnackBar;
  let dialogRef: MatDialogRef<EditComponent>;
  const dummyHero = {
    id: 1,
    name: 'Wolverine',
    originalname: 'Logan',
    description: 'A mutant',
    strength: 11,
    class: 'antihero',
    picture: 'some_url',
    powers: [
      {
        name: 'Rapid Healing',
        description: 'Heal rapidly from injuries',
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EditComponent,
        LoaderSpinnerComponent,
        AddImageComponent,
        ReusableButtonComponent,
      ],
      providers: [
        {
          provide: SuperHeroesService,
          useValue: {
            selectedSuperHeroId$: of(1),
            getHeroeById: () => dummyHero,
            updateHeroeById: () => {},
            updateSuperHeroImage: () => {},
            clearPowers: () => {},
            savePowers: () => {},
            loadPowers: () => {},
          },
        },
        //     { provide: MatDialogRef, useValue: {} },

        {
          provide: MatSnackBar,
          useValue: {
            open: () => {},
          },
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {},
          },
        },
      ],
      imports: [
        MatSnackBarModule,
        MatDialogModule,
        FormsModule,
        MatChipsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    superHeroesService = TestBed.inject(SuperHeroesService);
    snackBar = TestBed.inject(MatSnackBar);
    dialogRef = TestBed.inject(MatDialogRef);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load superhero data on ngOnInit', () => {
    component.ngOnInit();
    expect(component.superhero).toEqual(dummyHero);
    expect(component.powers).toEqual(dummyHero.powers);
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const spy = spyOn(component.superHeroSubscription!, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should validate form correctly', () => {
    component.ngOnInit();
    component.validateForm();
    expect(component.isValidForm).toBeTrue();
  });

  it('should capitalize fields', () => {
    const event = { target: { value: 'logan' } };
    component.superhero = { ...dummyHero };
    component.capitalizeField(event, 'name');
    expect(component.superhero.name).toEqual('Logan');
  });

  it('should save changes', () => {
    const spy = spyOn(superHeroesService, 'updateHeroeById');
    const snackBarSpy = spyOn(snackBar, 'open');
    component.superhero = { ...dummyHero };
    component.powers = [...dummyHero.powers];
    component.saveChanges();
    expect(spy).toHaveBeenCalledWith(dummyHero.id, {
      ...dummyHero,
      powers: dummyHero.powers,
    });
    expect(snackBarSpy).toHaveBeenCalledWith(
      'The changes have been made successfully',
      'OK',
      jasmine.any(Object)
    );
  });

  it('should cancel edition', () => {
    const spy = spyOn(dialogRef, 'close');
    component.cancelEdition();
    expect(spy).toHaveBeenCalled();
  });

  it('should set image URL when onImageSelected is called', () => {
    const url = 'http://example.com/image.jpg';
    component.onImageSelected(url);
    expect(component.superheroImage).toEqual(url);
  });

  it('should remove existing power', () => {
    const power = { name: 'Fly', description: 'Can fly' };
    component.powers = [power];
    component.removePower(power);
    expect(component.powers).not.toContain(power);
  });

  it('should set isLoading to true then false when saveChanges is called', fakeAsync(() => {
    component.superhero = { ...dummyHero };
    component.powers = [...dummyHero.powers];
    component.saveChanges();
    expect(component.isLoading).toBeTrue();
    tick(1000);
    expect(component.isLoading).toBeFalse();
  }));

  it('should add new power', () => {
    const loadPowersSpy = spyOn(
      superHeroesService,
      'loadPowers'
    ).and.returnValue(of([]));
    const savePowersSpy = spyOn(superHeroesService, 'savePowers');

    component.newPower = { name: 'New Power', description: 'New description' };
    component.addPower();

    expect(loadPowersSpy).toHaveBeenCalled();
    expect(savePowersSpy).toHaveBeenCalledWith([
      { name: 'Rapid Healing', description: 'Heal rapidly from injuries' },
      { name: 'New Power', description: 'New description' },
    ]);
  });
});
