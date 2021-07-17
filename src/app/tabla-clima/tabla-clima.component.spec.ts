import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaClimaComponent } from './tabla-clima.component';

describe('TablaClimaComponent', () => {
  let component: TablaClimaComponent;
  let fixture: ComponentFixture<TablaClimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaClimaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaClimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
