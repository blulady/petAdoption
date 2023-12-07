import { Component, OnInit } from '@angular/core';
import { DataStorageFirebase } from 'src/app/shared/data-storage-firebase.service';
import { PetService } from '../pet.service';
import { petModel } from '../petmodel';

@Component({
  selector: 'app-pet-listing',
  templateUrl: './pet-listing.component.html',
  styleUrls: ['./pet-listing.component.css']
})
export class PetListingComponent implements OnInit {
  petData: petModel[] = [];

  constructor(private data: DataStorageFirebase, private petService: PetService){}
//   ngOnInit(): void {
//   this.data.fetchPets();
//   console.log(this.data.fetchPets())
// }

ngOnInit(): void{
// this.data.fetchPets();
this.petData = this.petService.getPets();
this.petService.petListChange.subscribe((pets: petModel[]) => {
  this.petData = pets;
  console.log(this.petData)
})


}
}
