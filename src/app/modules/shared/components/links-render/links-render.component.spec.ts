import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksRenderComponent } from './links-render.component';

describe('LinksRenderComponent', () => {
  let component: LinksRenderComponent;
  let fixture: ComponentFixture<LinksRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinksRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
