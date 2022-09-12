import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifTaskComponent } from './modif-task.component';

describe('ModifTaskComponent', () => {
  let component: ModifTaskComponent;
  let fixture: ComponentFixture<ModifTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
