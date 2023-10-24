import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddImageComponent } from './add-image.component';

describe('AddImageComponent', () => {
  let component: AddImageComponent;
  let fixture: ComponentFixture<AddImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddImageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImageComponent);
    component = fixture.componentInstance;
  });

  it('should initialize imageUrl based on superheroImage if imageUrl is null', () => {
    component.superheroImage = 'some_superhero_image_url';
    component.ngOnInit();

    expect(component.imageUrl).toEqual('some_superhero_image_url');
  });

  it('should not initialize imageUrl if both imageUrl and superheroImage are null', () => {
    component.ngOnInit();

    expect(component.imageUrl).toBeNull();
  });

  it('should emit imageSelected event when imageUrl is not null', () => {
    component.imageUrl = 'some_image_url';
    const imageSelectedSpy = spyOn(component.imageSelected, 'emit');

    component.onUrlEntered();

    expect(imageSelectedSpy).toHaveBeenCalledWith('some_image_url');
  });

  it('should not emit imageSelected event when imageUrl is null', () => {
    component.imageUrl = null;
    const imageSelectedSpy = spyOn(component.imageSelected, 'emit');

    component.onUrlEntered();

    expect(imageSelectedSpy).not.toHaveBeenCalled();
  });
});
