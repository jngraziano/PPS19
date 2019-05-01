import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabinicialPage } from './tabinicial.page';

describe('TabinicialPage', () => {
  let component: TabinicialPage;
  let fixture: ComponentFixture<TabinicialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabinicialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabinicialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
