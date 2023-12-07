import { Injectable } from '@angular/core';
import { petModel } from './petmodel';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PetService {

  startedEditing = new Subject<number>();
  petSelected = new Subject<petModel>();
  petListChange = new Subject<petModel[]>();

  public petData: petModel[] = [
    new petModel('Spot', 'Is a good boy', 'dog', 123, 1, 'https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_700,h_467/https://puppyintraining.com/wp-content/uploads/Black-and-White-Dog-Names-700x467.jpg' ),
    new petModel('Rufus', 'Is a bad boy', 'dog', 124, 2, 'https://www.rocketdogrescue.org/wp-content/uploads/2018/06/IMG_9025-1.jpg' ),
    new petModel('Tabby', 'A crazy feline', 'cat', 125, 3, 'https://i.pinimg.com/736x/b0/3c/be/b03cbeaded6326b85d1edb86c91caa59.jpg' ),
    new petModel('Nolan', 'Is a genius dog', 'dog', 126, 4, 'https://thevillagevets.com/wp-content/uploads/2022/10/most-intelligent-dog-breeds-atlanta-ga.jpg' ),
    new petModel('Twinkles', 'Is a large hairless cat', 'cat', 127, 5, 'https://justintadlock.com/user/media/2023/07/twinkle-cat-bed.webp' ),
  ]
  constructor() { }
 //function to return petData array of pets

  getPets() {

    return this.petData
  }
  //function to create a new pet
  addPet(pet: petModel) {
    this.petData.push(pet);
    this.petListChange.next(this.petData.slice());
    console.log(this.petData);
}
 //function to delete a pet
 deleteItem(index: number) {
  this.petData.splice(index, 1);
  this.petListChange.next(this.petData.slice());
    alert(
      'Your pet has been succesfully removed!!!!'
    );
  }

  //function to set pets
  setPetList(petData: petModel[]){
    this.petData = petData;
    this.petListChange.next(this.petData.slice());
  }
  //function to edit a pet?


}
