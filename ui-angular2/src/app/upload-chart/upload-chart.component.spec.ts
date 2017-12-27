import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadChartComponent } from './upload-chart.component';

describe('UploadChartComponent', () => {
  let component: UploadChartComponent;
  let fixture: ComponentFixture<UploadChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
