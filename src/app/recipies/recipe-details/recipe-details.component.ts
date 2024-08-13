import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe-list/recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.modal';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe!: Recipe;
  id!: number;
  constructor(
    private slService: ShoppingListService,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.slService.addToShopping(ingredients);
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.recipeService.onDelete(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
