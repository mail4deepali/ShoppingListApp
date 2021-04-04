import { Injectable } from '@angular/core';
import { Item } from './item.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})

//service
export class ShoppingListService {

  constructor(private http:HttpClient) { }

  readonly baseURL = "https://localhost:44364/api/shoppinglist/";
  formData: Item = new Item();
  list: Item[];

  postItem(){
    return this.http.post(this.baseURL, this.formData);
  }

  putItem(){
   var url = `${this.baseURL}${this.formData.itemId}`;
   return this.http.put(url, this.formData);
  }

  refreshList(){
    this.http.get(this.baseURL)
    .toPromise()
    .then(res => this.list = res as Item[])
  }

  deleteItem(id: number){
    var url = `${this.baseURL}${id}`;
    return this.http.delete(url)
  }

}
