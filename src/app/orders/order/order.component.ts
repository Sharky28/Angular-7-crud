import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { OrderItemComponent } from '../order-item/order-item.component';
import { CustomerService } from 'src/app/shared/customer.service';
import { Customer } from 'src/app/shared/customer.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'false-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {
  customerList:Customer[];
  isValid:boolean= true;

  constructor(private service: OrderService,
    private dialog:MatDialog,
    private customerService:CustomerService,
    private toaster:ToastrService,
    private router:Router) { }

  ngOnInit() {
    this.resetForm();

    this.customerService.getCustomerList().then(res => this.customerList = res as Customer[]);
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

  validateForm(){
    this.isValid=true;
    if(this.service.formData.CustomerID==0){
      this.isValid = false;
    }
    else if ( this.service.orderItems.length==0){
      this.isValid=false;
    }
    return this.isValid;
  }

  onSubmit(form:NgForm){
    if(this.validateForm()){
      this.service.saveOrUpdateOrder().subscribe(res =>{
        this.resetForm();
        this.toaster.success('Submited Successfully', 'Restuarant App');
        this.router.navigate(['/orders']);
      })
    }

  }
}
