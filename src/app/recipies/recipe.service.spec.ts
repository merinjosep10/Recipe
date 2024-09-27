import { Ingredient } from '../shared/ingredient.modal';
import { Recipe } from './recipe-list/recipe.model';
import { RecipeService } from './recipe.service';

describe('RecipeService', () => {
  let service: RecipeService;

  beforeEach(() => {
    service = new RecipeService();
  });

  it('should return the correct recipe by index', () => {
    const recipe = service.getRecipe(0);
    expect(recipe).toBeTruthy();
    expect(recipe.name).toBe('Pasta');
  });

  it('should add recipe', () => {
    const newRecipe = new Recipe('Salad', 'Healthy', 'delicious', 'img-url', [
      new Ingredient('Lettuce', '1'),
      new Ingredient('carrot', '2'),
    ]);

    let emittedRecipes: Recipe[] = [];
    service.recipesChanged.subscribe((recipes) => (emittedRecipes = recipes));

    service.onAddRecipe(newRecipe);

    expect(service.getRecipies().length).toBe(3);
    expect(service.getRecipe(2).name).toBe('Salad');
    expect(emittedRecipes.length).toBe(3);
  });

  it('Should update a recipe', () => {
    const updatedRecipe = new Recipe(
      'Updated Pasta',
      'Very Delecious',
      'Very delicious',
      'img.jpg',
      [new Ingredient('Pasta', '200g'), new Ingredient('Tomatato', '2')]
    );

    let emittedRecipes: Recipe[] = [];
    service.recipesChanged.subscribe((recipes) => (emittedRecipes = recipes));

    service.onUpdateRecipe(0, updatedRecipe);

    expect(service.getRecipe(0).name).toBe('Updated Pasta');
    expect(service.getRecipe(0).description).toBe('Very Delecious');
    expect(service.getRecipe(0).imagePath).toBe('img.jpg');
    expect(emittedRecipes[0].name).toBe('Updated Pasta');
  });

  it('should delete a recipe and emit the updated recipes array', () => {
    let emittedRecipes: Recipe[] = [];
    service.recipesChanged.subscribe((recipes) => (emittedRecipes = recipes));

    service.onDelete(0);

    expect(service.getRecipies().length).toBe(1);
    expect(service.getRecipies()[0].name).toBe('Chickpea Curry');
    expect(emittedRecipes.length).toBe(1);
  });
});
