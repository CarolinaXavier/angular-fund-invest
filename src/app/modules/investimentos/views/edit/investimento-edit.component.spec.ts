import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestimentoEditComponent } from './investimento-edit.component';

describe('InvestimentoEditComponent', () => {
  let component: InvestimentoEditComponent;
  let fixture: ComponentFixture<InvestimentoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestimentoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestimentoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
