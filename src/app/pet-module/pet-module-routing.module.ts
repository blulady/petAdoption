import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetListingComponent } from './pet-listing/pet-listing.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';

const routes: Routes = [
  {
    path: '',
    component: PetListingComponent,
    children: [
      {
        path: ':id',
        component: PetDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetModuleRoutingModule { }
