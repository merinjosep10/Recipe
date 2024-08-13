import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.modal';

@Injectable()
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  edit = false;
  ingredients: Ingredient[] = [
    new Ingredient('Apple', '5'),
    new Ingredient('Orange', '10'),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addToShopping(ingredient: Ingredient[]) {
    this.ingredients.push(...ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
