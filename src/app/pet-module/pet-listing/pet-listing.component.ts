import { Component, OnInit } from '@angular/core';
import { DataStorageFirebase } from 'src/app/shared/data-storage-firebase.service';

@Component({
  selector: 'app-pet-listing',
  templateUrl: './pet-listing.component.html',
  styleUrls: ['./pet-listing.component.css']
})
export class PetListingComponent implements OnInit {

  constructor(private data: DataStorageFirebase){}
  ngOnInit(): void {
  this.data.fetchPets();
  console.log(this.data.fetchPets())
}
}
