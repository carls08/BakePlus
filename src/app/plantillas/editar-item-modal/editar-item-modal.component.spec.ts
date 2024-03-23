import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarItemModalComponent } from './editar-item-modal.component';

describe('EditarItemModalComponent', () => {
  let component: EditarItemModalComponent;
  let fixture: ComponentFixture<EditarItemModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarItemModalComponent]
    });
    fixture = TestBed.createComponent(EditarItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
