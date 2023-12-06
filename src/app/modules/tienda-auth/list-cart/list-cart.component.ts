import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../../tienda-guest/service/cart.service';
import { Router } from '@angular/router';

declare function alertSuccess([]):any;
declare function alertDanger([]):any;
declare var paypal:any;
@Component({
  selector: 'app-list-cart',
  templateUrl: './list-cart.component.html',
  styleUrls: ['./list-cart.component.css']
})
export class ListCartComponent implements OnInit {

  @ViewChild('paypal',{static: true}) paypalElement?: ElementRef;

  listCarts: any = [];
  listCartsProducts: any = [];
  user:any = null;
  code:any = null;
  totalSum:any = 0;

  constructor(
    public cartService:CartService,
    public router:Router

  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.cart();
    this.paypalApi();
  }

  cart(){
    this.cartService.currentData$.subscribe((resp:any)=>{
      console.log(resp);
      this.listCarts = resp;
      this.listCartsProducts = resp;
      this.totalSum = this.listCarts.reduce((sum:number, item:any)=> sum + item.total,0 );
      this.totalSum = this.listCartsProducts.reduce((sum:number, item:any)=> sum + item.total,0 );
    })

    if(this.user){
      this.cartService.listCart().subscribe((resp:any)=>{
        console.log(resp);
        resp.carts.data.forEach((cart:any) => {
          this.cartService.addCart(cart);
        });
      })
    }
  }

  getNameCampaing(type:number){
    let Name = "";
    switch (type){
      case 1:
        Name = "Campaña Normal"
        break;
      case 2:
          Name = "Campaña Flash"
          break;
      case 3:
          Name = "Campaña Banner"
          break;

      default:
          break;
    }
    return Name;
  }

  removeItem(cart:any){
    this.cartService.deleteCart(cart.id).subscribe((resp:any)=>{
      console.log(resp);
      alertSuccess('Articulo removido');
      this.cartService.removeItemCart(cart);
    })
  }

  aplicarCoupon(){
    if(!this.code){
      alertDanger("Necesitas ingresar un cupon válido")
      return;
    }
    let data ={
      code: this.code
    }
    this.cartService.applyCoupon(data).subscribe((resp:any)=>{
      if(resp.message == 403){
        alertDanger(resp.message_text);
      }else{
        this.cartService.resetCart();
        setTimeout(()=>{
          resp.carts.data.forEach((cart:any)=>{
            this.cartService.addCart(cart);
  
          }) 
        },50);
        alertSuccess("El cupón se ha registrado correctamente");
      }
      console.log(resp);
    })
  }

  paypalApi(){
    paypal.Buttons({
      // optional styling for buttons
      // https://developer.paypal.com/docs/checkout/standard/customize/buttons-style-guide/
      style: {
        color: "gold",
        shape: "rect",
        layout: "vertical"
      },

      // set up the transaction
      createOrder: (data:any, actions:any) => {
          // pass in any options from the v2 orders create call:
          // https://developer.paypal.com/api/orders/v2/#orders-create-request-body
          if(this.totalSum == 0){
            alertDanger("No puedes pagar un monto de 0")
            return false;
          }
          if(this.listCarts.length == 0){
            alertDanger("No puedes procesar el pago con ningun curso en el carrito")
            return false;
          }
          const createOrderPayload = {
            purchase_units: [
              {
                amount: {
                    description: "COMPRAR POR EL ECOMMERCE",
                    value: this.totalSum 
                }
              }
            ]
          };

          return actions.order.create(createOrderPayload);
      },

      // finalize the transaction
      onApprove: async (data:any, actions:any) => {
          
          let Order = await actions.order.capture();
          // Order.purchase_units[0].payments.captures[0].id

          let dataT ={
            method_payment: "PAYPAL" ,
            currency_total: "USD",
            currency_payment: "USD",
            total: this.totalSum,
            n_transaccion: Order.purchase_units[0].payments.captures[0].id
          }
        this.cartService.checkout(dataT).subscribe((resp:any)=>{
          console.log(resp);
          alertSuccess("Compra satisfactoria");
          this.emptyCart();
          return this.router.navigateByUrl("/tienda-auth/perfil-del-cliente")
        })
          // return actions.order.capture().then(captureOrderHandler);
      },

      // handle unrecoverable errors
      onError: (err:any) => {
          console.error('An error prevented the buyer from checking out with PayPal');
      }
  }).render(this.paypalElement?.nativeElement);
  }

  emptyCart():void{
    this.listCarts = [];
    this.listCartsProducts = [];
    this.totalSum = 0;
    this.cartService.resetCart();
  }
}
