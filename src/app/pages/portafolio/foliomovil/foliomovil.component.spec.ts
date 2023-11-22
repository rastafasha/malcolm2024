import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoliomovilComponent } from './foliomovil.component';

describe('FoliomovilComponent', () => {
  let component: FoliomovilComponent;
  let fixture: ComponentFixture<FoliomovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoliomovilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoliomovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
