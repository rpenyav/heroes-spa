import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
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

  const heroMock: XMenCharacter = {
    id: 1,
    name: 'Magneto',
    originalname: 'Erik Lehnsherr',
    description:
      'A powerful mutant terrorist with the ability to generate and control mental magnetic fields',
    strength: 12,
    class: 'evil',
    picture:
      'https://res.cloudinary.com/dazfoa93m/image/upload/t_filletio/v1697655859/xmen/cshjx4a2pwmspzawlhn0.jpg',
    powers: [
      {
        name: 'Mental Magnetic Fields',
        description: 'Control mental magnetic fields',
      },
      {
        name: 'Magnetic Manipulation',
        description: 'Manipulate metal objects using magnetism',
      },
    ],
  };

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
    mockSuperHeroesService.getHeroeById.and.returnValue(of(heroMock));
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

  it('should navigate to /404 if id is null', fakeAsync(() => {
    const mockActivatedRoute = {
      paramMap: of(convertToParamMap({ id: null })),
    };
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    const mockSuperHeroesService = jasmine.createSpyObj('SuperHeroesService', [
      'getHeroeById',
    ]);
    const mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    const mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    const component = new DetailComponent(
      mockActivatedRoute as any,
      mockRouter,
      mockSuperHeroesService,
      mockDialog,
      mockSnackBar
    );
    component.ngOnInit();
    tick();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/404']);
  }));

  it('should set superheroId and superhero if id is not null', fakeAsync(() => {
    const testId = 1;
    const mockActivatedRoute = {
      paramMap: of(convertToParamMap({ id: null })),
    };
    mockSuperHeroesService.getHeroeById.and.returnValue(heroMock);
    mockActivatedRoute.paramMap = of(convertToParamMap({ id: testId }));
    const component = new DetailComponent(
      mockActivatedRoute as any,
      mockRouter,
      mockSuperHeroesService,
      mockDialog,
      mockSnackBar
    );
    component.ngOnInit();
    tick();
    expect(component.superheroId).toEqual(testId);
    expect(component.superhero).toEqual(heroMock);
  }));

  it('should log an error message if copy fails', () => {
    spyOn(document, 'execCommand').and.throwError('fake error');
    spyOn(console, 'error');
    component.copyPageUrlToClipboard();
    expect(console.error).toHaveBeenCalledWith(
      'Could not copy to clipboard: ',
      jasmine.anything()
    );
  });

  it('should navigate to 404 if getHeroeById returns null', fakeAsync(() => {
    const mockActivatedRoute = {
      paramMap: of(convertToParamMap({ id: null })),
    };
    mockActivatedRoute.paramMap = of(convertToParamMap({ id: 1 }));
    mockSuperHeroesService.getHeroeById.and.returnValue(null);
    const component = new DetailComponent(
      mockActivatedRoute as any,
      mockRouter,
      mockSuperHeroesService,
      mockDialog,
      mockSnackBar
    );
    component.ngOnInit();
    tick();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/404']);
  }));

  it('should set imageLoaded to true when onImageLoad is called', () => {
    const mockActivatedRoute = {
      paramMap: of(convertToParamMap({ id: null })),
    };
    const component = new DetailComponent(
      mockActivatedRoute as any,
      mockRouter,
      mockSuperHeroesService,
      mockDialog,
      mockSnackBar
    );

    expect(component.imageLoaded).toBe(false); // Antes de llamar al método
    component.onImageLoad();
    expect(component.imageLoaded).toBe(true); // Después de llamar al método
  });

  it('should set superhero.picture to "assets/no-image-big.jpg" when onImageError is called and superhero is not null', () => {
    const mockActivatedRoute = {
      paramMap: of(convertToParamMap({ id: null })),
    };
    const component = new DetailComponent(
      mockActivatedRoute as any,
      mockRouter,
      mockSuperHeroesService,
      mockDialog,
      mockSnackBar
    );
    component.superhero = heroMock;

    component.onImageError();
    expect(component.superhero!.picture).toEqual('assets/no-image-big.jpg');
  });

  it('should log an error when onImageError is called and superhero is null', () => {
    const mockActivatedRoute = {
      paramMap: of(convertToParamMap({ id: null })),
    };
    const component = new DetailComponent(
      mockActivatedRoute as any,
      mockRouter,
      mockSuperHeroesService,
      mockDialog,
      mockSnackBar
    );
    component.superhero = null;

    spyOn(console, 'error');

    component.onImageError();
    expect(console.error).toHaveBeenCalledWith('Superhero object is null');
  });
});
