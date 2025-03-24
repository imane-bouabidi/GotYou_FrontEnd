import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationAmountComponent } from './donation-amount.component';

describe('DonationAmountComponent', () => {
  let component: DonationAmountComponent;
  let fixture: ComponentFixture<DonationAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationAmountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
