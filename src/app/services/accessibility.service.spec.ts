import { TestBed } from '@angular/core/testing';
import { AccessibilityService } from './accessibility.service';

describe('AccessibilityService', () => {
  let service: AccessibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should maximize text size', () => {
    const initialSize = service.obtainTextSize();
    service.maximizeTextSize();
    expect(service.obtainTextSize()).toEqual(initialSize + 2);
  });

  it('should not maximize text size above 24px', () => {
    service['sizOfText'] = 24;
    service.maximizeTextSize();
    expect(service.obtainTextSize()).toEqual(24);
  });

  it('should minimize text size', () => {
    const initialSize = service.obtainTextSize();
    service.minimizeTextSize();
    expect(service.obtainTextSize()).toEqual(initialSize - 2);
  });

  it('should not minimize text size below 12px', () => {
    service['sizOfText'] = 12;
    service.minimizeTextSize();
    expect(service.obtainTextSize()).toEqual(12);
  });

  it('should apply text size', () => {
    service['sizOfText'] = 20;
    service['applyTextSize']();
    expect(document.body.style.fontSize).toBe('20px');
  });
});
