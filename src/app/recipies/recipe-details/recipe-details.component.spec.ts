import { Ingredient } from './../../shared/ingredient.modal';
import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailsComponent } from './recipe-details.component';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('RecipeDetailsComponent', () => {
  let mockSlService: jasmine.SpyObj<ShoppingListService>;
  let mockRecipeService: jasmine.SpyObj<RecipeService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: ActivatedRoute;
  let component: RecipeDetailsComponent;
  let fixture: ComponentFixture<RecipeDetailsComponent>;

  beforeEach(async () => {
    mockSlService = jasmine.createSpyObj('ShoppingListService', [
      'addToShopping',
    ]);
    mockRecipeService = jasmine.createSpyObj('RecipeService', [
      'getRecipe',
      'onDelete',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      params: of({ id: 1 }),
    } as unknown as ActivatedRoute;

    mockRecipeService.getRecipe.and.returnValue({
      name: 'Test Recipe',
      description: ' Test Desc',
      description2: 'test desc',
      imagePath: 'img.jpg',
      ingredients: [],
    });

    await TestBed.configureTestingModule({
      declarations: [RecipeDetailsComponent],
      providers: [
        { provide: RecipeService, useValue: mockRecipeService },
        { provide: ShoppingListService, useValue: mockSlService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call addToShopping function when addToSoppingList is called', () => {
    const testIngredients = [
      new Ingredient('test1', 'amount1'),
      new Ingredient('test2', 'amount2'),
    ];
    component.addToShoppingList(testIngredients);
    expect(mockSlService.addToShopping).toHaveBeenCalled();
  });

  it('Should call onDelete function from the recipeService when onDelete function is called', () => {
    component.onDelete();
    expect(mockRecipeService.onDelete).toHaveBeenCalledWith(1);
  });
});
