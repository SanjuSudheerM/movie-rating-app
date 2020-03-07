import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as branding \'MOVIE\' in semi bold', () => {
    const brandingText = `${fixture.debugElement.nativeElement.querySelector('span.title.semi-bold').innerText}`;
    expect(brandingText).toEqual('MOVIE');
  });

  it('should have as branding \'RATING\' in thin', () => {
    const brandingText = `${fixture.debugElement.nativeElement.querySelector('span.title.thin').innerText}`;
    expect(brandingText).toEqual('RATING');
  });

  it('should have as branding \'MOVIE RATING\'', () => {
    // tslint:disable-next-line: max-line-length
    const brandingText = `${fixture.debugElement.nativeElement.querySelector('span.title.semi-bold').innerText} ${fixture.debugElement.nativeElement.querySelector('span.title.thin').innerText}`;
    expect(brandingText).toEqual('MOVIE RATING');
  });

});
