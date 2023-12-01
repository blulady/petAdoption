import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class PetfinderApiService {
    readonly petfinderURL = '';
    // //api.petfinder.com/v2/animals
    // //api.petfinder.com/v2/animals/{id}

    constructor(
        private http: HttpClient,
    ) {}
    
    getPetById(id: number) {
        return this.http.get(`${this.petfinderURL}/${id}`)
        // don't .subscribe(); here, subscribe in the component?
    }

}