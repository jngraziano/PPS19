import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsEstPage } from './tabs-est.page';

describe('TabsEstPage', () => {
  let component: TabsEstPage;
  let fixture: ComponentFixture<TabsEstPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsEstPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsEstPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
