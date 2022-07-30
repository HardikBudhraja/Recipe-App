import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  private igChangeSub !: Subscription ;

  constructor(private slService: ShoppingListService, private loggingService: LoggingService) { } 

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.igChangeSub = this.slService.ingredientsChanged.subscribe(
      (ingredient: Ingredient[]) =>{
        this.ingredients = ingredient;
      }
    )
    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }
  ngOnDestroy(): void {
      this.igChangeSub.unsubscribe();
  }

  onSelect(id: number){
    this.slService.startedEditing.next(id);
  }

}
