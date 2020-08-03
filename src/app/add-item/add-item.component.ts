import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.income = [...JSON.parse(localStorage.getItem("income"))];
    this.expenses = [...JSON.parse(localStorage.getItem("expenses"))];
  }

  @Input('newItemForUpdate') newItem = {
    amount :  null , 
    desc : ""
  }

  @Input('activeUpdate') activeButtonUpdate : boolean = false;

  @Output('update') update = new EventEmitter();
 
  totalBudget : number = (JSON.parse(localStorage.getItem("totalincome"))) - (-JSON.parse(localStorage.getItem("totalexpenses")));

  income : any[]  = [];
  expenses : any[] = [];

  totalIncome :number = 0;
  totalExpenses :number = 0;
  
  saveItem = (addItemForm) => {
    if(addItemForm.value.amount > 0 ){
      this.newItem = addItemForm.value;
      this.income.push(this.newItem);
      this.newItem = {
        amount : null , 
        desc : ""
      }

      // Calcule the total income 
      let incomeX = 0;
      for(let i = 0 ; i < this.income.length ; i++){
        incomeX += this.income[i].amount;
      }
      this.totalIncome = incomeX;

      localStorage.setItem("income" , JSON.stringify(this.income));
      localStorage.setItem("totalincome" , JSON.stringify(this.totalIncome));

      window.location.reload();

    }else{
      this.newItem = addItemForm.value;
      this.expenses.push(this.newItem);
      this.newItem = {
        amount : null , 
        desc : ""
      } 

      // calcule the total expenses
      let expensesx = 0;
      for(let i = 0 ; i < this.expenses.length ; i++){
        expensesx += this.expenses[i].amount;
      }
      this.totalExpenses = expensesx;

      localStorage.setItem("expenses" , JSON.stringify(this.expenses));
      localStorage.setItem("totalexpenses" , JSON.stringify(this.totalExpenses));

      window.location.reload();
      
    }
  }

  updateFun = () => {
    this.update.emit(this.newItem);
  }
}
