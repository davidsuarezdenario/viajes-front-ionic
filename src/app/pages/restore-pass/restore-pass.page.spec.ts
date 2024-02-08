import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestorePassPage } from './restore-pass.page';

describe('RestorePassPage', () => {
  let component: RestorePassPage;
  let fixture: ComponentFixture<RestorePassPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RestorePassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
