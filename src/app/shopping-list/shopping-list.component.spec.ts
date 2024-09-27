import { ShoppingListService } from './shopping-list.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListComponent } from './shopping-list.component';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.modal';
import { Subject } from 'rxjs';

describe('ShoppingListComponent', () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;
  let mockSlService: jasmine.SpyObj<ShoppingListService>;

  beforeEach(async () => {
    mockSlService = jasmine.createSpyObj('ShoppingListService', [
      'getIngredients',
    ]);

    mockSlService.ingredientsChanged = new EventEmitter<Ingredient[]>();
    mockSlService.startedEditing = new Subject<number>();

    await TestBed.configureTestingModule({
      declarations: [ShoppingListComponent],
      providers: [{ provide: ShoppingListService, useValue: mockSlService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should update the ingredients on any change', () => {
    const mockIngredients = [
      { name: 'Ingredient1', amount: '3' },
      { name: 'Ingredient2', amount: '5' },
    ];
    mockSlService.getIngredients.and.returnValue(mockIngredients);

    component.ngOnInit();

    expect(component.ingredients).toEqual(mockIngredients);

    const updatedIngredients = [
      { name: 'Ingredient1', amount: '2' },
      { name: 'Ingredient2', amount: '5' },
    ];

    mockSlService.ingredientsChanged.emit(updatedIngredients);

    expect(component.ingredients).toEqual(updatedIngredients);
  });

  it('Should trigger the startedEditing subject on calling function onEdit', () => {
    const startedEditingSpy = spyOn(mockSlService.startedEditing, 'next');
    component.onEdit(2);

    expect(startedEditingSpy).toHaveBeenCalledWith(2);
  });
});
