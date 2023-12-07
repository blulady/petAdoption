import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PetService } from "../pet-module/pet.service";
import { petModel } from "../pet-module/petmodel";


@Injectable({providedIn: 'root'})
export class DataStorageFirebase {

  constructor(private http: HttpClient, private petService: PetService){}

storePets() {
  const petList = this.petService.getPets();
  this.http.put(
    'https://petadoption-9abd7-default-rtdb.firebaseio.com/pets.json', petList)
  .subscribe(response => {
    console.log(response);
  })
}
fetchPets(){
  this.http.get<petModel[]>(
    'https://petadoption-9abd7-default-rtdb.firebaseio.com/pets.json')
  .subscribe(petList => {
    this.petService.setPetList(petList);
  })
}

}
