import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalgraficoComponent } from './modalgrafico.component';

describe('ModalgraficoComponent', () => {
  let component: ModalgraficoComponent;
  let fixture: ComponentFixture<ModalgraficoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalgraficoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalgraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
