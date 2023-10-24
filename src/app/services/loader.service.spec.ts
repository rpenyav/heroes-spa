import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';
import { take, toArray } from 'rxjs/operators';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should properly toggle isLoading', (done) => {
    const expectedSequence = [false, true, false];

    service.isLoading.pipe(take(3), toArray()).subscribe((values) => {
      expect(values).toEqual(expectedSequence);
      done();
    });

    service.showLoader();
    service.hideLoader();
  });
});
