import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolucionesWebComponent } from './soluciones-web.component';

describe('SolucionesWebComponent', () => {
  let component: SolucionesWebComponent;
  let fixture: ComponentFixture<SolucionesWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolucionesWebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolucionesWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
