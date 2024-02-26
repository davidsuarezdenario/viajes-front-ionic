import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingOnePage } from './booking-one.page';

describe('BookingOnePage', () => {
  let component: BookingOnePage;
  let fixture: ComponentFixture<BookingOnePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BookingOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
