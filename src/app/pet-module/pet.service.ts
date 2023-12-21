import { Injectable } from '@angular/core';
import { FavoritePetModel, PetModel } from './petmodel';
import { EMPTY, Subject } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class PetService {

  petSelected = new Subject<PetModel>();
  petListChange = new Subject<PetModel[]>();
  petFavSelected = new Subject<FavoritePetModel>();
  petFavListChange = new Subject<FavoritePetModel[]>();
  petFavorites: FavoritePetModel[] = [];

  onePet: PetModel;

  public petData: PetModel[] = [
    //now is populating below information via firebase api and petfinder api
    // new petModel('Spot', 'Is a good boy', 'dog', 123, 1, 'https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_700,h_467/https://puppyintraining.com/wp-content/uploads/Black-and-White-Dog-Names-700x467.jpg' ),
    // new petModel('Rufus', 'Is a bad boy', 'dog', 124, 2, 'https://www.rocketdogrescue.org/wp-content/uploads/2018/06/IMG_9025-1.jpg' ),
    // new petModel('Tabby', 'A crazy feline', 'cat', 125, 3, 'https://i.pinimg.com/736x/b0/3c/be/b03cbeaded6326b85d1edb86c91caa59.jpg' ),
    // new petModel('Nolan', 'Is a genius dog', 'dog', 126, 4, 'https://thevillagevets.com/wp-content/uploads/2022/10/most-intelligent-dog-breeds-atlanta-ga.jpg' ),
    // new petModel('Twinkles', 'Is a large hairless cat', 'cat', 127, 5, 'https://justintadlock.com/user/media/2023/07/twinkle-cat-bed.webp' ),
  ]

  constructor(private http: HttpClient, private authService: AuthService) {} // Inject HttpClient here

  //function to return petData array of pets
  getPets(): PetModel[] {
  return this.petData;
}
 //function to delete a pet
 deletePet(pet: PetModel): void {
  const index = this.petData.findIndex(p => p.id === pet.id);
  if (index !== -1) {
    this.petData.splice(index, 1);
    this.petListChange.next([...this.petData]);
    alert('Your pet has been successfully removed!');
  }
}
//function to set one pet
setOnePet(pet: PetModel) {
  this.onePet = pet;
  this.petSelected.next(pet);
}
   // Function to set multiple pets
   setPetList(petData: PetModel[]): void {
    this.petData = [...petData]; // Set the petData array with a new copy of the provided array
    this.petListChange.next([...this.petData]); // Emit a new copy of the petData array
  }

 // sets favorite pets array
  setFavoritePets(favoritePets: FavoritePetModel[]): void {
    this.petFavorites = [...favoritePets];
    this.petFavListChange.next([...this.petFavorites]);
  }
// adds a new favorite pet to array and firebase
  addToFavorites(pet: PetModel): void {
    if (!this.petFavorites.some(fav => fav.id === pet.id)) {
      const favoritePet: FavoritePetModel = { ...pet, favoriteDate: new Date() };
      this.petFavorites.push(favoritePet);
      this.updateFavoritePetsOnServer(); // Update Firebase on adding a favorite
      this.petFavListChange.next([...this.petFavorites]);
    }
  }
  //removes a pet from array and firebase
  removeFromFavorites(pet: PetModel): void {
    this.petFavorites = this.petFavorites.filter(fav => fav.id !== pet.id);
    this.updateFavoritePetsOnServer(); // Update Firebase on removing a favorite
    this.petFavListChange.next([...this.petFavorites]);
  }
//updates favorite pets array on firebase
private updateFavoritePetsOnServer(): void {
  this.authService.user.pipe(
    take(1),
    exhaustMap(user => {
      if (!user || !user.token) {
        // Handle the case when user or user.token is null or undefined
        console.error('User not logged in or token not available.');
        // You might want to redirect the user to the login page or handle the scenario accordingly
        return EMPTY; // Returning an empty observable to stop further execution
      }
      return this.http.put<FavoritePetModel[]>(
        'https://petadoption-9abd7-default-rtdb.firebaseio.com/favorites.json?auth=' + user.token,
        this.petFavorites
      );
    })
  ).subscribe(
    response => {
      console.log('Favorite pets updated on Firebase:', response);
    },
    error => {
      console.error('Error updating favorite pets:', error);
      // Handle the error as needed
    }
  );
}
  // function to return favorite pets array of pets
  getFavorites(): FavoritePetModel[] {
    return this.petFavorites;
  }
}


