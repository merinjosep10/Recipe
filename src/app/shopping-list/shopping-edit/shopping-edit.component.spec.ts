import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ShoppingEditComponent } from './shopping-edit.component';
import { ShoppingListService } from '../shopping-list.service';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.modal';

describe('ShoppingEditComponent', () => {
  let component: ShoppingEditComponent;
  let fixture: ComponentFixture<ShoppingEditComponent>;
  let mockSlService: jasmine.SpyObj<ShoppingListService>;

  beforeEach(async () => {
    mockSlService = jasmine.createSpyObj(ShoppingListService, [
      'getIngredient',
      'addIngredient',
      'updateIngredient',
      'deleteIngredient',
    ]);

    mockSlService.startedEditing = new Subject<number>();

    await TestBed.configureTestingModule({
      declarations: [ShoppingEditComponent],
      imports: [FormsModule],
      providers: [{ provide: ShoppingListService, useValue: mockSlService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set editMode to true and initialize the form', () => {
    const testIngredient = new Ingredient('Test', '2');
    mockSlService.getIngredient.and.returnValue(testIngredient);

    mockSlService.startedEditing.next(1);
    fixture.detectChanges();

    expect(component.editMode).toBeTrue();
    expect(component.editIndex).toBe(1);
    expect(component.editIngredient).toEqual(testIngredient);
    expect(component.slform?.value).toEqual({
      name: testIngredient.name,
      amount: testIngredient.amount,
    });
  });

  it('should call addIngredient if editMode is false', () => {
    const formValue = {
      name: 'New',
      amount: '2',
    };
    const formSpy = jasmine.createSpyObj('NgForm', ['reset']);

    component.onAddItem({
      value: formValue,
      reset: formSpy.reset,
    } as any);

    expect(mockSlService.addIngredient).toHaveBeenCalledWith(
      new Ingredient(formValue.name, formValue.amount)
    );
    expect(component.editMode).toBeFalse();
    expect(formSpy.reset).toHaveBeenCalled();
  });

  it('should call updateIngredient on ShoppingListService if in editMode', () => {
    component.editMode = true;
    component.editIndex = 1;

    const formValue = {
      name: 'Updated Ingredient',
      amount: '10',
    };
    const formSpy = jasmine.createSpyObj('NgForm', ['reset']);

    component.onAddItem({
      value: formValue,
      reset: formSpy.reset,
    } as any);

    expect(mockSlService.updateIngredient).toHaveBeenCalledWith(
      1,
      new Ingredient(formValue.name, formValue.amount)
    );
    expect(component.editMode).toBeFalse();
    expect(formSpy.reset).toHaveBeenCalled();
  });

  it('should call deleteIngredient on ShoppingList and then reset form and editMode to false', () => {
    component.editMode = true;
    component.editIndex = 1;
    const formSpy = jasmine.createSpyObj('NgForm', ['reset']);

    component.slform = formSpy;
    component.onDelete();

    expect(mockSlService.deleteIngredient).toHaveBeenCalledWith(1);
    expect(component.editMode).toBeFalse();
    expect(formSpy.reset).toHaveBeenCalled();
  });

  it('should unsubscribe from startedEditing on component destroy', () => {
    const unsubscribeSpy = spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
