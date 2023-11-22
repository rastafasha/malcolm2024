import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndesarolloComponent } from './endesarollo.component';

describe('EndesarolloComponent', () => {
  let component: EndesarolloComponent;
  let fixture: ComponentFixture<EndesarolloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndesarolloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndesarolloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
