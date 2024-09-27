import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeItemComponent } from './recipe-item.component';
import { RecipeService } from '../../recipe.service';
import { Recipe } from '../recipe.model';
import { By } from '@angular/platform-browser';

describe('RecipeItemComponent', () => {
  let component: RecipeItemComponent;
  let fixture: ComponentFixture<RecipeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeItemComponent],
      providers: [RecipeService],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should Display the input recipe', () => {
    const mockRecipe: Recipe = {
      name: 'Test',
      description: 'desc',
      description2: 'desc2',
      imagePath: 'img.jpg',
      ingredients: [],
    };

    component.recipe = mockRecipe;

    fixture.detectChanges();

    const nameElement = fixture.debugElement.query(By.css('h4')).nativeElement;
    const descriptionElement = fixture.debugElement.query(
      By.css('p')
    ).nativeElement;
    const imageElement = fixture.debugElement.query(
      By.css('img')
    ).nativeElement;

    expect(nameElement.textContent).toContain(mockRecipe.name);
    expect(descriptionElement.textContent).toContain(mockRecipe.description);
    expect(imageElement.src).toContain(mockRecipe.imagePath);
  });
});
