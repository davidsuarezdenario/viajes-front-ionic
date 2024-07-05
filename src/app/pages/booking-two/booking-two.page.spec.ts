import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingTwoPage } from './booking-two.page';

describe('BookingTwoPage', () => {
  let component: BookingTwoPage;
  let fixture: ComponentFixture<BookingTwoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BookingTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
