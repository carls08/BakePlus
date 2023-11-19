import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionRecetaComponent } from './descripcion-receta.component';

describe('DescripcionRecetaComponent', () => {
  let component: DescripcionRecetaComponent;
  let fixture: ComponentFixture<DescripcionRecetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescripcionRecetaComponent]
    });
    fixture = TestBed.createComponent(DescripcionRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
