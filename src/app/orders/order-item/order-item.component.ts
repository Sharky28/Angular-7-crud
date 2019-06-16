import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { OrderItem } from 'src/app/shared/order-item.model';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';


@Component({
  selector: 'false-order-item',
  templateUrl: './order-item.component.html',
  styles: []
})
export class OrderItemComponent implements OnInit {

  formData: OrderItem;
  itemList: Item[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemComponent>,
    private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItemList().then(res => this.itemList = res as Item[]);
    this.formData = {
      OrderItemID: null,
      OrderID: this.data.OrderID,
      ItemID: 0,
      ItemName: '',
      Price: 0,
      Quantity: 0,
      Total: 0
    }
  }

  updatePrice(ctrl){
    if(ctrl.selectedIndex==0){
      this.formData.Price = 0;
      this.formData.ItemName = '';
    }
    else{
      this.formData.Price= this.itemList[ctrl.selectedIndex-1].Price;
      this.formData.ItemName= this.itemList[ctrl.selectedIndex-1].Name;

    }
    this.updateTotal();
  }

  updateTotal(){
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2));
  }


}
