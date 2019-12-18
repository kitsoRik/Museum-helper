import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturesPageComponent } from './pictures-page.component';

describe('PicturesPageComponent', () => {
  let component: PicturesPageComponent;
  let fixture: ComponentFixture<PicturesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicturesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
