import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShoppingItemsListComponent } from './shopping-items-list/shopping-items-list.component';
import { ShoppingItemFormComponent } from './shopping-items-list/shopping-item-form/shopping-item-form.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {ShoppingListClient} from './shared/api';
import {API_BASE_URL} from 'src/app/shared/api';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingItemsListComponent,
    ShoppingItemFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    ShoppingListClient,
    {provide: API_BASE_URL, useValue:environment.appBaseURL}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
