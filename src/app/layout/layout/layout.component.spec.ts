import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { LayoutComponent } from './layout.component';
import { AccessibilityService } from '../../services/accessibility.service';
import { of } from 'rxjs';
import { AddComponent, ReusableButtonComponent } from '../../components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockAccessibilityService: jasmine.SpyObj<AccessibilityService>;

  beforeEach(() => {
    mockDialog = jasmine.createSpyObj(['open']);
    mockDialog.open.and.returnValue({
      afterClosed: () => of({}),
    } as MatDialogRef<typeof AddComponent>);

    mockAccessibilityService = jasmine.createSpyObj([
      'maximizeTextSize',
      'minimizeTextSize',
    ]);

    TestBed.configureTestingModule({
      declarations: [LayoutComponent, ReusableButtonComponent],
      imports: [
        MatDialogModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
      ],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: AccessibilityService, useValue: mockAccessibilityService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the add modal', () => {
    component.openAddModal();
    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should maximize text size', () => {
    component.maxTextSize();
    expect(mockAccessibilityService.maximizeTextSize).toHaveBeenCalled();
  });

  it('should minimize text size', () => {
    component.minTextSize();
    expect(mockAccessibilityService.minimizeTextSize).toHaveBeenCalled();
  });
});
