import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe-list/recipe.model';
import { Ingredient } from '../shared/ingredient.modal';
import { Subject } from 'rxjs';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Pasta',
      'Fresh pasta is SO easy to make!',
      'https://media.theeverygirl.com/wp-content/uploads/2021/06/easy-dinner-recipes-teg-new-featured.jpeg',
      [new Ingredient('Pasta', '200g'), new Ingredient('Tomatoes', '2')]
    ),
    new Recipe(
      'Chickpea Curry',
      'Creamy, flavor packed and full of plant protein.',
      'https://www.eatingwell.com/thmb/Kx41aHMgb9iAY41IM5eSrQi-3O8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chickpea-curry-chhole-1x1-41ea4d53c7df4fddabd83caa5b57718e.jpg',
      [new Ingredient('Chickpea', '100g'), new Ingredient('Onion', '2')]
    ),
  ];

  getRecipies() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  onAddRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  onUpdateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  onDelete(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
