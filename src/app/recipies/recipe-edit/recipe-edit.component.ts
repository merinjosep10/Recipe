import { Subscription } from 'rxjs';
import { Recipe } from './../recipe-list/recipe.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id!: number;
  editmode = false;
  recipeForm!: FormGroup;
  subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private RService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editmode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImage = '';
    let recipedesc = '';
    let recipedesc2 = '';
    let recipeIngredients = new FormArray<FormGroup>([]);

    if (this.editmode) {
      const recipe = this.RService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImage = recipe.imagePath;
      recipedesc = recipe.description;
      recipedesc2 = recipe.description2;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, Validators.required),
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      image: new FormControl(recipeImage, Validators.required),
      desc: new FormControl(recipedesc, Validators.required),
      desc2: new FormControl(recipedesc2, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, Validators.required),
      })
    );
  }

  onDeleteIngredient(index: number) {
    const ingredients = <FormArray>this.recipeForm.get('ingredients');
    ingredients?.removeAt(index);
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['desc'],
      this.recipeForm.value['desc2'],
      this.recipeForm.value['image'],
      this.recipeForm.value['ingredients']
    );
    if (this.editmode) {
      this.RService.onUpdateRecipe(this.id, newRecipe);
    } else {
      this.RService.onAddRecipe(newRecipe);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
