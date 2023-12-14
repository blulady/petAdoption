import { Component } from '@angular/core';
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
export class PetListingComponent {
  petData: PetModel[] = [];
  showForm: boolean = false;
  newPet: Partial<PetModel> = {}; // Partial type for the new pet object
  formValid: boolean = true; // Flag to track form validation

  constructor(
    private data: DataStorageFirebase,
    private petService: PetService,
    private petfinderApiService: PetfinderApiService,
    private router: Router) {}

    ngOnInit(): void {
      // Fetch data on component initialization
      this.petfinderApiService.getListOfPets();
      this.petService.petListChange.subscribe((pets: PetModel[]) => {
        this.petData = pets; // Assign fetched data to petData array
      });
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

  deletePet(pet: PetModel): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to remove this listing, and not see it again?')) {
      this.petService.deletePet(pet);
    }
  }

  showAddPetForm(): void {
    this.showForm = !this.showForm; // Toggle form visibility
  }

  // Function to generate a unique ID for the new pet
  generateUniqueId(): number {
    return Math.floor(Math.random() * 10000); // Replace this with your unique ID generation logic
  }

  // Function to handle form submission
  onSubmit(): void {
    this.checkFormValidity(); // Check form validity before submission
    if (this.formValid) {
      const newPet: PetModel = {
        id: this.generateUniqueId(),
        name: this.newPet.name!,
        species: this.newPet.species!,
        description: this.newPet.description!,
        photo: this.newPet.photo!,
      };

      // Store the new pet in Firebase
      this.data.storePet(newPet).subscribe(response => {
        console.log('New pet stored in Firebase:', response);
        // Add the new pet to the local data after storing in Firebase
        this.petData.push(newPet);
        // Clear the form and hide it after submission
        this.clearForm();
        this.showForm = false;
      });
    } else {
      // Display a message to the user to fill out all fields
      alert('Please fill out all fields.');
    }
  }

  // Function to check form validity
  checkFormValidity(): void {
    this.formValid = true; // Reset form validity flag
    if (!this.newPet.name || !this.newPet.species || !this.newPet.description || !this.newPet.photo) {
      this.formValid = false; // Set form validity flag to false
    }
  }

  // Function to clear the form fields
  clearForm(): void {
    this.newPet = {}; // Clear the newPet object
  }
  editPet(petId: number): void {
    event.stopPropagation(); // Stop event propagation
    // Find the selected pet by its ID
    const selectedPet = this.petData.find(pet => pet.id === petId);

    // Check if the selected pet exists
    if (selectedPet) {
      // Populate the form fields with the selected pet's information
      this.newPet = { ...selectedPet }; // Copy the selected pet's data to newPet
      this.showForm = true; // Activate the form
    }
  }
}
