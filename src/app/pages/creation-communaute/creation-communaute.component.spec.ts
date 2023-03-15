import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationCommunauteComponent } from './creation-communaute.component';

describe('CreationCommunauteComponent', () => {
  let component: CreationCommunauteComponent;
  let fixture: ComponentFixture<CreationCommunauteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationCommunauteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationCommunauteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
