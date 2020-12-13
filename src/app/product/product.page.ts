import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { InAppPurchase2, IAPProduct } from '@ionic-native/in-app-purchase-2/ngx';
 
@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  public category: any = {
    lightGrey: true,
  }

  product: any;
  constructor(public platform: Platform, private iap2: InAppPurchase2) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      // this.setup();
    })
  }

  setup() {
    this.iap2.verbosity = this.iap2.DEBUG;
    this.iap2.register({
      id: 'ip_101',
      type: this.iap2.CONSUMABLE
    });
    this.product = this.iap2.get('ip_101');
    this.registerHandlersForPurchase('ip_101');
    // restore purchase
    this.iap2.refresh();
  }

  checkout() {
    this.registerHandlersForPurchase('ip_101');
    this.setup();
    try {
      let product = this.iap2.get('ip_101');
      console.log('Product Info: ' + JSON.stringify(product));
      this.iap2.order('ip_101').then((p) => {
        console.log('Purchase Succesful' + JSON.stringify(p));
      }).catch((e) => {
        console.log('Error Ordering From Store' + e);
      });
    } catch (err) {
      console.log('Error Ordering ' + JSON.stringify(err));
    }
  }

  registerHandlersForPurchase(productId) {
    let self = this.iap2;
    this.iap2.when(productId).updated(function (product) {
      if (product.loaded && product.valid && product.state === self.APPROVED && product.transaction != null) {
        product.finish();
      }
    });
    this.iap2.when(productId).registered((product: IAPProduct) => {
      // alert(` owned ${product.owned}`);
    });
    this.iap2.when(productId).owned((product: IAPProduct) => {
      // alert(` owned ${product.owned}`);
      product.finish();
    });
    this.iap2.when(productId).approved((product: IAPProduct) => {
      // alert('approved');
      product.finish();
    });
    this.iap2.when(productId).refunded((product: IAPProduct) => {
      // alert('refunded');
    });
    this.iap2.when(productId).expired((product: IAPProduct) => {
      // alert('expired');
    });
  }

}
