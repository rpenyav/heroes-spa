import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { SuperHeroesService } from 'src/app/services/super-heroes.service';
import { AddComponent } from './add.component';
import { XMenCharacter, Power } from 'src/app/model/characters';
import { AddImageComponent } from './add-image/add-image.component';
import { ReusableButtonComponent } from '../ui/reusable-button/reusable-button.component';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let mockSuperHeroesService: jasmine.SpyObj<SuperHeroesService>;
  let mockMatDialogRef: jasmine.SpyObj<MatDialogRef<AddComponent>>;

  beforeEach(() => {
    mockSuperHeroesService = jasmine.createSpyObj([
      'loadPowers',
      'clearPowers',
      'addSuperheroe',
      'savePowers',
    ]);
    mockMatDialogRef = jasmine.createSpyObj(['close']);

    TestBed.configureTestingModule({
      declarations: [AddComponent, AddImageComponent, ReusableButtonComponent],
      imports: [FormsModule],
      providers: [
        { provide: SuperHeroesService, useValue: mockSuperHeroesService },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;

    mockSuperHeroesService.loadPowers.and.returnValue(of([]));

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should initialize correctly', () => {
    expect(component.powers).toEqual([]);
    expect(component.newSuperHero).toEqual({
      name: '',
      originalname: '',
      strength: 0,
      class: '',
      description: '',
    });
    expect(component.isValidForm).toBeFalse();
  });

  it('should validate form correctly', () => {
    const testCharacter: XMenCharacter = {
      id: 1,
      name: 'Spider-Man',
      originalname: 'Peter Parker',
      strength: 90,
      class: 'Hero',
      description: 'Web slinger',
      picture: 'some-url',
      powers: [],
    };

    component.newSuperHero = testCharacter;
    delete component.newSuperHero.id;
    delete component.newSuperHero.picture;
    delete component.newSuperHero.powers;

    component.validateForm();
    expect(component.isValidForm).toBeTrue();
  });

  it('should add new power correctly', () => {
    const newPower: Power = { name: 'Web Slinging', description: 'Shoot webs' };
    component.newPower = newPower;

    component.addPower();
    expect(component.powers.length).toEqual(1);
    expect(component.powers[0]).toEqual(newPower);
    expect(mockSuperHeroesService.savePowers).toHaveBeenCalledWith([newPower]);
    expect(component.newPower).toEqual({ name: '', description: '' });
  });

  it('should remove power correctly', () => {
    const powerToRemove: Power = {
      name: 'Web Slinging',
      description: 'Shoot webs',
    };
    component.powers = [powerToRemove];

    component.removePower(powerToRemove);
    expect(component.powers).toEqual([]);
    expect(mockSuperHeroesService.savePowers).toHaveBeenCalledWith([]);
  });
});
