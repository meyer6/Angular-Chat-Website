import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFriendCardComponent } from './add-friend-card.component';

describe('AddFriendCardComponent', () => {
  let component: AddFriendCardComponent;
  let fixture: ComponentFixture<AddFriendCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFriendCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFriendCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
