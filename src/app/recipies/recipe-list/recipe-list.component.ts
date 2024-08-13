import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes!: Recipe[];
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.recipesChanged.subscribe((recipies: Recipe[]) => {
      this.recipes = recipies;
    });
    this.recipes = this.recipeService.getRecipies();
  }
}
