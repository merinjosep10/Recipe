import { Ingredient } from 'src/app/shared/ingredient.modal';

export class Recipe {
  public name: string;
  public description: string;
  public description2: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(
    name: string,
    desc: string,
    desc2: string,
    imagePath: string,
    ingredients: Ingredient[]
  ) {
    this.name = name;
    this.description = desc;
    this.description2 = desc2;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
