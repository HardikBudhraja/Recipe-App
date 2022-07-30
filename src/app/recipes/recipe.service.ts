import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Chole Bature',
  //     'Chole bhature is a food dish popular in the Northern areas of the Indian subcontinent. It is a combination of chana masala and bhatura/puri, a fried bread made from maida.',
  //     'https://i2.wp.com/s3.amazonaws.com/vasuraj/web/wp-content/uploads/2017/09/17224933/chole-bhaure.jpg?fit=1600%2C993&ssl=1',
  //     [new Ingredient('Chole', 300), new Ingredient('Maida', 250)]
  //   ),
  //   new Recipe(
  //     'Rajma Chawal',
  //     `Rajma chawal is derived from Punjab and this recipe is super unique as we have mixed the rajma curry and cooked basmati rice and made it likeapulao.`,
  //     'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.t3oIv1x4Ao0wymKflato5gHaEK%26pid%3DApi&f=1',
  //     [new Ingredient('Kidney Beans', 400), new Ingredient('Rice', 500)]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}


  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    this.recipes[id] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
