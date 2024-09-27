import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipiesComponent } from './recipies/recipies.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { Router } from '@angular/router';
import { RecipeStartComponent } from './recipies/recipe-start/recipe-start.component';
import { RecipeListComponent } from './recipies/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipies/recipe-details/recipe-details.component';
import { RecipeItemComponent } from './recipies/recipe-list/recipe-item/recipe-item.component';
import { RecipeEditComponent } from './recipies/recipe-edit/recipe-edit.component';
import { RecipeService } from './recipies/recipe.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', redirectTo: '/recipies', pathMatch: 'full' },
          { path: 'recipies', component: RecipiesComponent },
          { path: 'shopping-list', component: ShoppingListComponent },
        ]),
      ],
      declarations: [
        AppComponent,
        RecipiesComponent,
        ShoppingListComponent,
        RecipeStartComponent,
        RecipeListComponent,
        RecipeDetailsComponent,
        RecipeItemComponent,
        RecipeEditComponent,
      ],
      providers: [RecipeService, ShoppingListService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render the app-header component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).not.toBeNull();
  });

  it('should render the router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should display RecipiesComponent when navigating to /recipies', async () => {
    await router.navigate(['/recipies']);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-recipies')).not.toBeNull();
  });

  it('should display ShoppingListComponent when navigating to /shopping-list', async () => {
    await router.navigate(['/shopping-list']);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-shopping-list')).not.toBeNull();
  });
});
