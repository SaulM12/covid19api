import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimaInicioComponent } from './clima-inicio.component';

describe('ClimaInicioComponent', () => {
  let component: ClimaInicioComponent;
  let fixture: ComponentFixture<ClimaInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClimaInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimaInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
