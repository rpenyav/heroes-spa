import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { LoaderService } from '../services/loader.service';
import { Subject } from 'rxjs';
import { LoaderInterceptor } from './loader-interceptor';

describe('LoaderInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoaderService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    loaderService = TestBed.inject(LoaderService);
  });

  it('should set isLoading to true at the beginning and to false at the end', () => {
    const isLoadingSpy = spyOn(loaderService.isLoading, 'next');

    httpClient.get('/some-api').subscribe();

    const req: TestRequest = httpTestingController.expectOne('/some-api');
    expect(req.request.method).toEqual('GET');
    expect(isLoadingSpy).toHaveBeenCalledWith(true);

    req.flush({ data: 'some-data' });

    expect(isLoadingSpy).toHaveBeenCalledWith(false);

    httpTestingController.verify();
  });

  it('should handle HTTP errors', () => {
    const isLoadingSpy = spyOn(loaderService.isLoading, 'next');

    httpClient.get('/error-api').subscribe(
      () => {},
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req: TestRequest = httpTestingController.expectOne('/error-api');
    expect(req.request.method).toEqual('GET');
    expect(isLoadingSpy).toHaveBeenCalledWith(true);

    req.flush(null, { status: 404, statusText: 'Not Found' });

    expect(isLoadingSpy).toHaveBeenCalledWith(false);
  });
});
