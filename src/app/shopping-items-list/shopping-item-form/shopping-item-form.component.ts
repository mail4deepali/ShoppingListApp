import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ShoppingListClient } from 'src/app/shared/api';
import { Item } from 'src/app/shared/item.model';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shopping-item-form',
  templateUrl: './shopping-item-form.component.html',
  styles: [ ]
})
export class ShoppingItemFormComponent implements OnInit {
  readonly baseURL = "https://localhost:44364";

  constructor(public service:ShoppingListService,
    private toastr: ToastrService,private http:HttpClient, private shoppingListClient: ShoppingListClient) { 
      
    }

  ngOnInit(): void {  
  }

  onSubmit(form : NgForm){
    
     if(this.service.formData.itemId == 0){
        this.insertRecord(form);
     }
     else{
       this.updateRecord(form);
     }

  }

  insertRecord(form: NgForm){

console.log(form.value);
    this.shoppingListClient.postItem(form.value).subscribe(
      res => {
        console.log('Success');
          this.resetForm(form);
          this.service.refreshList();
          this.toastr.success("Submitted Successfully.", "Item Added.");
      },
      err => {
        console.log('Error')
        console.log(err);
        
        
      }
    );
  }

  updateRecord(form: NgForm){
    this.service.putItem().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info("Updated Successfully", "Item Updated");
      },
      err => {
        console.log(err);
      }
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new Item();
  }

}
