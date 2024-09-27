import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link to /recipies', () => {
    const linkDebugElement = fixture.debugElement.query(
      By.css('a[routerLink="/recipies"]')
    );
    expect(linkDebugElement).not.toBeNull();
    const linkElement: HTMLElement = linkDebugElement.nativeElement;
    expect(linkElement.textContent?.trim()).toBe('Recipies');
  });

  it('should have a link to /shopping-list', () => {
    const linkDebugElement = fixture.debugElement.query(
      By.css('a[routerLink="/shopping-list"]')
    );
    expect(linkDebugElement).not.toBeNull();
    const linkElement: HTMLElement = linkDebugElement.nativeElement;
    expect(linkElement.textContent?.trim()).toBe('Shopping List');
  });
});
