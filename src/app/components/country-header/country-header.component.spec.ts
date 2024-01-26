import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryHeaderComponent } from './county-header.component';

describe('HeaderComponent', () => {
  let component: CountryHeaderComponent;
  let fixture: ComponentFixture<CountryHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CountryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
