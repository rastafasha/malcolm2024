import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerInicioComponent } from './banner-inicio.component';

describe('BannerInicioComponent', () => {
  let component: BannerInicioComponent;
  let fixture: ComponentFixture<BannerInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerInicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
