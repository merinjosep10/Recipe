import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipiesComponent } from './recipies.component';
import { RecipeService } from './recipe.service';
import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe-list/recipe.model';

describe('RecipiesComponent', () => {
  let component: RecipiesComponent;
  let fixture: ComponentFixture<RecipiesComponent>;
  let mockRecipeService: jasmine.SpyObj<RecipeService>;
  let mockRecipe: Recipe;
  let recipeSelectedEmitter: EventEmitter<Recipe>;

  beforeEach(async () => {
    recipeSelectedEmitter = new EventEmitter<Recipe>();

    mockRecipeService = jasmine.createSpyObj('RecipeService', [], {
      recipeSelected: recipeSelectedEmitter,
    });

    mockRecipe = {
      name: 'Test Recipe',
      description: 'Test Description',
      description2: 'Test Description2',
      imagePath: 'test-image-path.jpg',
      ingredients: [],
    };

    await TestBed.configureTestingModule({
      declarations: [RecipiesComponent],
      providers: [{ provide: RecipeService, useValue: mockRecipeService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to recipeSelected on init', () => {
    recipeSelectedEmitter.emit(mockRecipe);

    expect(component.selectedRecipe).toEqual(mockRecipe);
  });

  it('should unsubscribe from recipeSelected on destroy', () => {
    spyOn(component.subscription, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();

    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
