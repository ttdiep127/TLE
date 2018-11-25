import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivementComponent } from './archivement.component';

describe('ArchivementComponent', () => {
  let component: ArchivementComponent;
  let fixture: ComponentFixture<ArchivementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
