import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Item } from '../shared/item.model';
import { ShoppingListService } from '../shared/shopping-list.service';

@Component({
  selector: 'app-shopping-items-list',
  templateUrl: './shopping-items-list.component.html',
  styles: [ ]
})
export class ShoppingItemsListComponent implements OnInit {

  constructor(public service: ShoppingListService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  PopulateForm(selectedItem: Item){
    this.service.formData = Object.assign({}, selectedItem);
  }

  onDelete(id: number){
    if(confirm("Are you sure to delete this record?"))
    {
    this.service.deleteItem(id).subscribe(
      res => {
          this.service.refreshList();
          this.toastr.success("Item Deleted Successfully.","Item Deleted")
      },
      err => {
        console.log(err);
      }
    );
    }
  }
}
