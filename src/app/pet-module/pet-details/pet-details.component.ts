import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PetfinderApiService } from '../petfinder-api.service';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit {
  petDetails = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petfinderApiService: PetfinderApiService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const petIdFromParams = params['id'];
      this.petDetails = this.petfinderApiService.getPetById(petIdFromParams);
      });
    }

  onClose() {
    this.router.navigate(['/']);
  }
  // or this function can be tied to a back button
  // will that be the correct route? this should go back to the search results listing
}
