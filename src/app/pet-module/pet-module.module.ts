import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetModuleRoutingModule } from './pet-module-routing.module';
import { PetListingComponent } from './pet-listing/pet-listing.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';



@NgModule({
  declarations: [
    PetListingComponent,
    PetDetailsComponent,
  ],
  imports: [
    CommonModule,
    PetModuleRoutingModule,
  ],

})
export class PetModuleModule { }
