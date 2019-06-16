import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { OrderItem } from 'src/app/shared/order-item.model';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';


@Component({
  selector: 'false-order-item',
  templateUrl: './order-item.component.html',
  styles: []
})
export class OrderItemComponent implements OnInit {

  formData: OrderItem;
  itemList: Item[];
  isValid:boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemComponent>,
    private itemService: ItemService,
    private orderService:OrderService) { }

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

  onSubmit(form:NgForm){
    if(this.validateForm(form.value)){
    this.orderService.orderItems.push(form.value);
    this.dialogRef.close();
    }
  }

  validateForm(formData:OrderItem){
    this.isValid = true;
    if(formData.ItemID ==0){
      this.isValid = false;
    }
    else if ( formData.Quantity ==0){
      this.isValid =false;
    }
    return this.isValid;

    
  }


}
