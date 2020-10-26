import { TestBed } from '@angular/core/testing';

import { UploadService } from '../services/file.upload.service';

describe('File.UploadService', () => {
  let service: UploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
