import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperHeroesService } from '../../services/super-heroes.service';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DetailComponent } from './detail.component';
import { XMenCharacter } from '../../model/characters';
import { of, Subject } from 'rxjs';
import { LayoutComponent } from 'src/app/layout/layout/layout.component';
import { ReusableButtonComponent } from '../ui/reusable-button/reusable-button.component';
import { AppModule } from 'src/app/app.module';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let mockRoute: any;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSuperHeroesService: jasmine.SpyObj<SuperHeroesService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let params: Subject<any>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<any>>;

  beforeEach(() => {
    params = new Subject();

    mockRouter = jasmine.createSpyObj(['navigate']);
    mockSuperHeroesService = jasmine.createSpyObj([
      'getHeroeById',
      'setSelectedSuperHeroId',
    ]);
    mockDialog = jasmine.createSpyObj(['open']);
    mockSnackBar = jasmine.createSpyObj(['open']);
    mockDialogRef = jasmine.createSpyObj(['afterClosed']);
    mockDialogRef.componentInstance = {
      modifyFromDetail: false,
      deleteFromDetail: false,
    };
    mockDialog.open.and.returnValue(mockDialogRef);

    mockRoute = { paramMap: params.asObservable() };

    TestBed.configureTestingModule({
      declarations: [DetailComponent, LayoutComponent, ReusableButtonComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: Router, useValue: mockRouter },
        { provide: SuperHeroesService, useValue: mockSuperHeroesService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
      imports: [AppModule, MatDialogModule, MatSnackBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the edit modal with correct parameters', () => {
    const returnedDialogRef = component.openEditModal(1);

    expect(mockDialog.open).toHaveBeenCalled();
    expect(mockSuperHeroesService.setSelectedSuperHeroId).toHaveBeenCalledWith(
      1
    );

    if (returnedDialogRef && returnedDialogRef.componentInstance) {
      expect(returnedDialogRef.componentInstance.modifyFromDetail).toBeTruthy();
    }
  });

  it('should open the delete modal with correct parameters', () => {
    component.openDeleteModal(1);

    expect(mockDialog.open).toHaveBeenCalled();
    expect(mockSuperHeroesService.setSelectedSuperHeroId).toHaveBeenCalledWith(
      1
    );

    if (mockDialogRef.componentInstance) {
      expect(mockDialogRef.componentInstance.deleteFromDetail).toBeTruthy();
    }
  });

  it('should attempt to copy the URL to clipboard', () => {
    spyOn(document, 'execCommand').and.returnValue(true);
    component.copyPageUrlToClipboard();
    expect(mockSnackBar.open).toHaveBeenCalled();
  });
});
