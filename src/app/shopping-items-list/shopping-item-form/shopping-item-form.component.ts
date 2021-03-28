import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Item } from 'src/app/shared/item.model';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';

@Component({
  selector: 'app-shopping-item-form',
  templateUrl: './shopping-item-form.component.html',
  styles: [ ]
})
export class ShoppingItemFormComponent implements OnInit {

  constructor(public service:ShoppingListService,
    private toastr: ToastrService) { }

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
    this.service.postItem().subscribe(
      res => {
          this.resetForm(form);
          this.service.refreshList();
          this.toastr.success("Submitted Successfully.", "Item Added.");
      },
      err => {
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
