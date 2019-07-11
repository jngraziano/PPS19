import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabimagePage } from './tabimage.page';

describe('TabimagePage', () => {
  let component: TabimagePage;
  let fixture: ComponentFixture<TabimagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabimagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabimagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
