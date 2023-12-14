import { Component, OnInit } from '@angular/core';
import { DataStorageFirebase } from 'src/app/shared/data-storage-firebase.service';
import { PetService } from '../pet.service';
import { PetfinderApiService } from '../petfinder-api.service';
import { PetModel } from '../petmodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-listing',
  templateUrl: './pet-listing.component.html',
  styleUrls: ['./pet-listing.component.css']
})
export class PetListingComponent implements OnInit {
  petData: PetModel[] = [];


  constructor(
    private data: DataStorageFirebase,
    private petService: PetService,
    private petfinderApiService: PetfinderApiService,
    private router: Router) {}

//   ngOnInit(): void {
//   this.data.fetchPets();
//   console.log(this.data.fetchPets())
// }

ngOnInit(): void{
  // this.data.fetchPets();
  this.getPetList();
  this.petService.petListChange.subscribe((pets: PetModel[]) => {
    this.petData = pets;
  })
}

goToDetail(id: number) {
  this.router.navigate(['/pet', id]);
}

getToken() {
  return new Promise<void>((resolve, reject) => {
    this.petfinderApiService.getOAuthToken();
    resolve();
  })
}

getPetList() {
  this.petfinderApiService.getListOfPets();
  this.petService.setPetList(this.petfinderApiService.petList);
  this.petService.petListChange.next(this.petService.petData.slice());
  console.log(this.petService.petData.slice());
}


isFavorite(pet: PetModel): boolean {
  // Implement logic to check if the pet is in favorites
  return this.petService.getFavorites().some(fav => fav.id === pet.id);
}

toggleFavorite(pet: PetModel): void {
  if (this.isFavorite(pet)) {
    this.petService.removeFromFavorites(pet);
  } else {
    this.petService.addToFavorites(pet);
  }
}
}
