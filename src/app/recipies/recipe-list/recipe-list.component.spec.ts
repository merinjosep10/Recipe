import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListComponent } from './recipe-list.component';
import { RecipeService } from '../recipe.service';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;
  let mockRecipeService: jasmine.SpyObj<RecipeService>;
  let mockRecipes: Recipe[];

  beforeEach(async () => {
    mockRecipeService = jasmine.createSpyObj('RecipeService', ['getRecipies']);
    mockRecipeService.recipesChanged = new Subject<Recipe[]>();

    await TestBed.configureTestingModule({
      declarations: [RecipeListComponent],
      providers: [{ provide: RecipeService, useValue: mockRecipeService }],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockRecipes = [
      {
        name: 'Test Recipe',
        description: 'Test Description',
        description2: 'Test Description2',
        imagePath: 'test-image-path.jpg',
        ingredients: [],
      },
      {
        name: 'Test Recipe2',
        description: 'Test Description2',
        description2: 'Test Description2',
        imagePath: 'test-image-path.jpg2',
        ingredients: [],
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should update the ingredients on any change', () => {
    mockRecipeService.getRecipies.and.returnValue(mockRecipes);

    component.ngOnInit();

    expect(component.recipes).toEqual(mockRecipes);

    let updatedRecipes = [
      {
        name: 'Test Recipe',
        description: 'Test Description',
        description2: 'Test Description',
        imagePath: 'test-image-path.jpg',
        ingredients: [],
      },
      {
        name: 'Test Recipe2',
        description: 'Test Description2',
        description2: 'Test Description',
        imagePath: 'test-image-path.jpg2',
        ingredients: [],
      },
    ];

    mockRecipeService.recipesChanged.next(updatedRecipes);

    expect(component.recipes).toEqual(updatedRecipes);
  });
});
