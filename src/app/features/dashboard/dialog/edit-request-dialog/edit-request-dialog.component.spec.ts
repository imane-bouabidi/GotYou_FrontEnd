import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRequestDialogComponent } from './edit-request-dialog.component';

describe('EditRequestDialogComponent', () => {
  let component: EditRequestDialogComponent;
  let fixture: ComponentFixture<EditRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRequestDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
