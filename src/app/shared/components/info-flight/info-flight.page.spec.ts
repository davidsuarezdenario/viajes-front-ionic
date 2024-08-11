import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoFlightPage } from './info-flight.page';

describe('InfoFlightPage', () => {
  let component: InfoFlightPage;
  let fixture: ComponentFixture<InfoFlightPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InfoFlightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
