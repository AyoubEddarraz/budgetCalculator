import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AddItemComponent } from './add-item/add-item.component';

import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AddItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [AddItemComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
