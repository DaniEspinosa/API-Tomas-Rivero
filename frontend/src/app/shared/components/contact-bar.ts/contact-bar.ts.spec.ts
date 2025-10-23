import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactBarTs } from './contact-bar.ts';

describe('ContactBarTs', () => {
  let component: ContactBarTs;
  let fixture: ComponentFixture<ContactBarTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactBarTs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactBarTs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
