import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './orders/order/order.component';

const routes: Routes = [
  {path:'',redirectTo:'order', pathMatch:'full'},
  {path:'orders',component:OrderComponent},
  {path:'order',children:[
      {path:'',component:OrderComponent},
      {path:'edit/',component:OrderComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
