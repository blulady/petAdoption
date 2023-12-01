import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class PetfinderApiService {
    singlePet = {};
    readonly petfinderURL = '';
    // https://api.petfinder.com/v2/animals/
    // https://api.petfinder.com/v2/animals/{id}
    // need to add apikey and token or just token?

    constructor(
        private http: HttpClient,
    ) {}
    
    getPetById(id: number) {
        return this.http.get(`${this.petfinderURL}/${id}`)

        // don't .subscribe(); here, subscribe in the component?
    }

}