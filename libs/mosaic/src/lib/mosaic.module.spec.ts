import { async, TestBed } from '@angular/core/testing';
import { MosaicModule } from './mosaic.module';

describe('MosaicModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MosaicModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MosaicModule).toBeDefined();
  });
});
