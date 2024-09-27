import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeEditComponent } from './recipe-edit.component';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { Recipe } from '../recipe-list/recipe.model';

describe('RecipeEditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;
  let mockRecipeService: jasmine.SpyObj<RecipeService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    mockRecipeService = jasmine.createSpyObj('RecipeService', [
      'onUpdateRecipe',
      'onAddRecipe',
      'getRecipe',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockActivatedRoute = {
      params: of({ id: 1 }),
    } as unknown as ActivatedRoute;

    mockRecipeService.getRecipe.and.returnValue({
      name: 'Test Recipe',
      description: 'Test Desc',
      description2: 'Test desc2',
      imagePath: 'img.jpg',
      ingredients: [
        { name: 'ingredient1', amount: '2' },
        { name: 'ingredient2', amount: '4' },
      ],
    });

    await TestBed.configureTestingModule({
      declarations: [RecipeEditComponent],
      providers: [
        { provide: RecipeService, useValue: mockRecipeService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should if there is id param editmode should be made true', () => {
    expect(component.editmode).toBeTrue();
  });

  it('Should add form array on onAddIngredient', () => {
    const formArray = component.recipeForm.get('ingredients') as FormArray;
    const initialLength = formArray.length;

    component.onAddIngredient();
    expect(formArray.length).toBe(initialLength + 1);
  });

  it('Should remove the ingredient at the given index if onDeleteIngredient is called', () => {
    const formArray = component.recipeForm.get('ingredients') as FormArray;
    const initialLength = formArray.length;

    component.onDeleteIngredient(1);
    expect(formArray.length).toBe(initialLength - 1);
  });

  it('Should call onUpdateRecipe on onSubmit if the editmode is true', () => {
    component.editmode = true;
    const testRecipe = new Recipe(
      'Test Recipe',
      'Test Desc',
      'Test desc2',
      'img.jpg',
      [
        { name: 'ingredient1', amount: '2' },
        { name: 'ingredient2', amount: '4' },
      ]
    );
    component.onSubmit();

    expect(mockRecipeService.onUpdateRecipe).toHaveBeenCalledWith(
      1,
      testRecipe
    );
  });

  it('Should add recipe if edit mode is off', () => {
    component.editmode = false;
    const testRecipe = new Recipe(
      'Test Recipe',
      'Test Desc',
      'Test desc2',
      'img.jpg',
      [
        { name: 'ingredient1', amount: '2' },
        { name: 'ingredient2', amount: '4' },
      ]
    );
    component.onSubmit();

    expect(mockRecipeService.onAddRecipe).toHaveBeenCalledWith(testRecipe);
  });

  it('Should unsubscribe on destoyal of the component', () => {
    const unsubscribeSpy = spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
