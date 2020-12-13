import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatetimePage } from './datetime/datetime.page';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ DatetimePage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [ DatetimePage ]
})
export class SharedModule { }
