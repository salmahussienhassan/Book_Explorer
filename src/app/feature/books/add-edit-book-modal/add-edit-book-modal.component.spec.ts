import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBookModalComponent } from './add-edit-book-modal.component';

describe('AddEditBookModalComponent', () => {
  let component: AddEditBookModalComponent;
  let fixture: ComponentFixture<AddEditBookModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditBookModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
