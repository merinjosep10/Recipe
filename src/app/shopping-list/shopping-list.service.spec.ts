import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.modal';

describe('ShoppingListService', () => {
  let service: ShoppingListService;

  beforeEach(() => {
    service = new ShoppingListService();
  });

  it('should return a copy of the ingredients array', () => {
    const ingredients = service.getIngredients();
    expect(ingredients.length).toBe(2);
    expect(ingredients[0].name).toBe('Apple');
  });

  it('should return the correct ingredient by index', () => {
    const ingredient = service.getIngredient(0);
    expect(ingredient).toBeTruthy();
    expect(ingredient.name).toBe('Apple');
  });

  it('should add a new ingredient and emit the updated ingredients array', () => {
    const newIngredient = new Ingredient('Banana', '6');

    let emittedIngredients: Ingredient[] = [];
    service.ingredientsChanged.subscribe(
      (ingredients) => (emittedIngredients = ingredients)
    );

    service.addIngredient(newIngredient);

    expect(service.getIngredients().length).toBe(3);
    expect(service.getIngredients()[2].name).toBe('Banana');
    expect(emittedIngredients.length).toBe(3);
  });

  it('should delete an ingredient and emit the updated ingredients array', () => {
    let emittedIngredients: Ingredient[] = [];
    service.ingredientsChanged.subscribe(
      (ingredients) => (emittedIngredients = ingredients)
    );

    service.deleteIngredient(0);

    expect(service.getIngredients().length).toBe(1);
    expect(service.getIngredients()[0].name).toBe('Orange');
    expect(emittedIngredients.length).toBe(1);
  });

  it('should update an ingredient and emit the updated ingredients array', () => {
    const updatedIngredient = new Ingredient('Updated Apple', '8');

    let emittedIngredients: Ingredient[] = [];
    service.ingredientsChanged.subscribe(
      (ingredients) => (emittedIngredients = ingredients)
    );

    service.updateIngredient(0, updatedIngredient);

    expect(service.getIngredient(0).name).toBe('Updated Apple');
    expect(emittedIngredients[0].name).toBe('Updated Apple');
  });

  it('should add multiple ingredients and emit the updated ingredients array', () => {
    const newIngredients = [
      new Ingredient('Strawberry', '15'),
      new Ingredient('Blueberry', '20'),
    ];

    let emittedIngredients: Ingredient[] = [];
    service.ingredientsChanged.subscribe(
      (ingredients) => (emittedIngredients = ingredients)
    );

    service.addToShopping(newIngredients);

    expect(service.getIngredients().length).toBe(4);
    expect(service.getIngredients()[2].name).toBe('Strawberry');
    expect(service.getIngredients()[3].name).toBe('Blueberry');
    expect(emittedIngredients.length).toBe(4);
  });
});
