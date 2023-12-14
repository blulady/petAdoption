import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { PetService } from 'src/app/pet-module/pet.service';
import { FavoritePetModel, PetModel } from 'src/app/pet-module/petmodel';
import { DataStorageFirebase } from 'src/app/shared/data-storage-firebase.service';
import { PetfinderApiService } from 'src/app/pet-module/petfinder-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  animalsToShow: any[] = []; // Initialized as empty array
  showButtons: boolean = true;
  petData: PetModel[] = [];

  constructor(private petfinderApiService: PetfinderApiService, private data: DataStorageFirebase, private petService: PetService, private router: Router)  {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        if (event.url === '/home') {
          this.showButtons = true;
        } else {
          this.showButtons = true;
        }
      });
  }

  ngOnInit(): void {
    this.fetchPetsWithPhotos();
  }

  fetchPetsWithPhotos() {
    this.petfinderApiService.getListOfPetsWithPhotos().subscribe((pets: PetModel[]) => {
      this.petData = pets.slice(0, 5); // Limit to 5 pets
    });
  }

  goToDetail(id: number): void {
    this.router.navigate(['/pet', id]);
  }

  toggleFavorite(pet: PetModel): void {
    if (this.isFavorite(pet)) {
      this.petService.removeFromFavorites(pet);
    } else {
      const favoritePet: FavoritePetModel = { ...pet, favoriteDate: new Date() };
      this.petService.addToFavorites(favoritePet);
    }
  }

  isFavorite(pet: PetModel): boolean {
    return this.petService.getFavorites().some(fav => fav.id === pet.id);
  }
  // Function to display cats
  // Function to filter and display cats
  showCats(): void {
    this.animalsToShow = this.petData.filter(pet => pet.species.toLowerCase() === 'cat');
    this.showButtons = false;
  }

  showDogs(): void {
    this.animalsToShow = this.petData.filter(pet => pet.species.toLowerCase() === 'dog');
    this.showButtons = false;
  }
    navigateToHome(): void {
      this.showButtons = true; // Set showButtons to true when navigating to home
      this.router.navigate(['/home']); // Navigate to the home page route
    }
  }

