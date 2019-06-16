import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { OrderItemComponent } from '../order-item/order-item.component';

@Component({
  selector: 'false-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {

  constructor(private service: OrderService,
    private dialog:MatDialog) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?:NgForm){
    if(form=null)
    form.resetForm();
    this.service.formData = {
      OrderID:null,
      OrderNo:Math.floor(100000+Math.random()*900000).toString(),
      CustomerID:0,
      PMethod:'',
      GTotal:0
     
    }; 
    this.service.orderItems=[];
  }

  AddOrEditOrderItem(orderItemIndex,OrderID){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    dialogConfig.data={orderItemIndex,OrderID};

this.dialog.open(OrderItemComponent,dialogConfig).afterClosed().subscribe(res=>{
  this.updateGrandTotal();
});
  }

  onDeleteOrderItem(oderItemID:number, i:number){
    this.service.orderItems.splice(i,1);
    this.updateGrandTotal();
  }
//the reducer function is invoked on each item in the array then summed and assigned
  updateGrandTotal(){
    this.service.formData.GTotal=this.service.orderItems.reduce((prev,curr)=>{
      //prev initialy 0 
      return prev+curr.Total;
    },0);

this.service.formData.GTotal= parseFloat(this.service.formData.GTotal.toFixed(2));

  }
}
