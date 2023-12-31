import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ReusableButtonComponent } from './reusable-button.component';

describe('ReusableButtonComponent', () => {
  let component: ReusableButtonComponent;
  let fixture: ComponentFixture<ReusableButtonComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ReusableButtonComponent],
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not navigate or emit when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();

    const navigateSpy = spyOn(router, 'navigate');
    const clickSpy = spyOn(component.onClick, 'emit');

    component.handleClick();

    expect(navigateSpy).not.toHaveBeenCalled();
    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should emit onClick event when clicked and not disabled', () => {
    const clickSpy = spyOn(component.onClick, 'emit');
    component.handleClick();
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should navigate when routerLink is a string', () => {
    component.routerLink = '/some-route';
    fixture.detectChanges();

    const navigateSpy = spyOn(router, 'navigate');
    component.handleClick();

    expect(navigateSpy).toHaveBeenCalledWith(['/some-route']);
  });

  it('should navigate when routerLink is an array', () => {
    component.routerLink = ['/some-route', 'sub-route'];
    fixture.detectChanges();

    const navigateSpy = spyOn(router, 'navigate');
    component.handleClick();

    expect(navigateSpy).toHaveBeenCalledWith(['/some-route', 'sub-route']);
  });
});
