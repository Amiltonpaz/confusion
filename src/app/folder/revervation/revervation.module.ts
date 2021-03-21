import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RevervationPageRoutingModule } from './revervation-routing.module';
import { RevervationPage } from './revervation.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevervationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RevervationPage]
})
export class RevervationPageModule {}
