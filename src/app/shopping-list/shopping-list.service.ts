
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from 'rxjs';

export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('Mango', 10)
      ];
    
      getIngredients(){
          return this.ingredients.slice();
      }

      getIngredient(id: number){
        return this.ingredients[id];
      }

      addIngredient(ingredient: Ingredient){
          this.ingredients.push(ingredient);
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]){
        //   for( let ingredient of ingredients){
        //       this.addIngredient(ingredient);
        //   }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      updateIngredient(id: number, newIngredient: Ingredient){
        this.ingredients[id] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(id: number){
        this.ingredients.splice(id,1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
}