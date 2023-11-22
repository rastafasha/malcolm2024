import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSolucionesComponent } from './banner-soluciones.component';

describe('BannerSolucionesComponent', () => {
  let component: BannerSolucionesComponent;
  let fixture: ComponentFixture<BannerSolucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerSolucionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerSolucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
