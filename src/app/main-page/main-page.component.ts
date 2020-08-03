import { AddItemComponent } from './../add-item/add-item.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  budget : number;
  activeColor : boolean;

  incomeArray : any[] = [];
  expensesArray : any[] = [];

  activeButtonUpdate : boolean = false;

  newItem = {
    amount : null , 
    desc : ""
  }

  totalIncome :number = 0;
  totalExpenses :number = 0;

  constructor(public addItemComponent : AddItemComponent) {
    // Budget 
      this.budget = addItemComponent.totalBudget;
      if(this.budget > 0){
        this.activeColor = true;
      }else if(this.budget < 0){
        this.activeColor = false;
      }
  }

  ngOnInit(): void {
    this.incomeArray = [...JSON.parse(localStorage.getItem("income"))];
    this.expensesArray = [...JSON.parse(localStorage.getItem("expenses"))];
    this.totalIncome = JSON.parse(localStorage.getItem("totalincome"));
    this.totalExpenses = JSON.parse(localStorage.getItem("totalexpenses"));
  }

  // Remove item 
  removeItemfromIncome = (item) => {
    let index = this.incomeArray.indexOf(item);
    this.incomeArray.splice(index , 1);
    
    let incomeX = 0;
    for(let i = 0 ; i < this.incomeArray.length ; i++){
      incomeX += this.incomeArray[i].amount;
    }
    this.totalIncome = incomeX;

    localStorage.setItem("income" , JSON.stringify(this.incomeArray));
    localStorage.setItem("totalincome" , JSON.stringify(this.totalIncome));

    window.location.reload();
  }

  removeItemfromExpenses = (item) => {
    let index = this.expensesArray.indexOf(item);
    this.expensesArray.splice(index , 1);

    let ExpensesX = 0;
    for(let i = 0 ; i < this.expensesArray.length ; i++){
      ExpensesX += this.expensesArray[i].amount;
    }
    this.totalExpenses = ExpensesX;

    localStorage.setItem("expenses" , JSON.stringify(this.expensesArray));
    localStorage.setItem("totalexpenses" , JSON.stringify(this.totalExpenses));

    window.location.reload();
  }

  // Update Income 

  activeUpdateIndex : number;

  updateIncome = (item) => {
    this.activeButtonUpdate = true;
    this.newItem = item;

    if(item.amount > 0){
      let indexActive = this.incomeArray.indexOf(item);
      this.activeUpdateIndex = indexActive;
    }else{
      let indexActive = this.expensesArray.indexOf(item);
      this.activeUpdateIndex = indexActive;
    }

  } 


  // for eventEmitter

  update = (myitem) => {
    if(myitem.amount > 0){
      this.incomeArray.splice(this.activeUpdateIndex , 1 , this.newItem);
      localStorage.setItem("income" , JSON.stringify(this.incomeArray));

      let incomeX = 0;
      for(let i = 0 ; i < this.incomeArray.length ; i++){
        incomeX += this.incomeArray[i].amount;
      }
      this.totalIncome = incomeX;

      localStorage.setItem("totalincome" , JSON.stringify(this.totalIncome));

      window.location.reload();

    }else{
      this.expensesArray.splice(this.activeUpdateIndex , 1 , this.newItem);
      localStorage.setItem("expenses" , JSON.stringify(this.expensesArray));
      
      let ExpensesX = 0;
      for(let i = 0 ; i < this.expensesArray.length ; i++){
        ExpensesX += this.expensesArray[i].amount;
      }
      this.totalExpenses = ExpensesX;

      localStorage.setItem("totalexpenses" , JSON.stringify(this.totalExpenses));

      window.location.reload();
    }

  }

  activemodal = () => {
    let modal = document.getElementById("modal");
    modal.style.transform = "scale(1)";
  }
  
  // Clear All
  clearAll = () => {
    localStorage.clear();
    window.location.reload();
  }

  Consel = () => {
    let modal = document.getElementById("modal");
    modal.style.transform = "scale(0)";
  }

}
