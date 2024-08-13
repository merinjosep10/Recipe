import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.modal';
import { ShoppingListService } from './../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnChanges {
  @Input() ingredient?: Ingredient;

  f = new FormGroup({
    name: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  });

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    // Initialization logic
  }

  // Called whenever an input property value changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ingredient'] && this.ingredient) {
      this.f.setValue({
        name: this.ingredient.name,
        amount: this.ingredient.amount,
      });
    }
  }

  onAddItem() {
    const newIngredient = new Ingredient(
      this.f.get('name')?.value as string,
      this.f.get('amount')?.value as string
    );
    this.slService.addIngredient(newIngredient);
    this.f.reset();
  }
}
