import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map, mergeMap } from 'rxjs';
import { PetModel } from './petmodel';
import { PetService } from './pet.service';


@Injectable({
    providedIn: 'root',
})


export class PetfinderApiService {
    singlePet: PetModel;
    petList: PetModel[] = [];
    token: string = '';

    readonly petfinderOAuthURL = 'https://api.petfinder.com/v2/oauth2/token';
    readonly petfinderURL = 'https://api.petfinder.com/v2/animals/';
    // https://api.petfinder.com/v2/animals/
    // https://api.petfinder.com/v2/animals/{id}


    tokenRequestBody = {
        "grant_type": "client_credentials",
        "client_id": environment.PETFINDER_CLIENT_ID,
        "client_secret": environment.PETFINDER_CLIENT_SECRET
    }

    constructor(
        private http: HttpClient,
        private petService: PetService
    ) {}

    getOAuthToken() {
        return this.http.post(this.petfinderOAuthURL, this.tokenRequestBody)
        .pipe(
            map(responseData => {
                let tokenArray = [];
                for (let val of Object.values(responseData)) {
                    tokenArray.push(val);
                }
                this.token = tokenArray[2];
                console.log(this.token);
                return this.token;
            })
        )
        .subscribe();
    }

    getListOfPets(): void {
        this.http.post(this.petfinderOAuthURL, this.tokenRequestBody)
        .pipe(
            map(responseData => {
                let tokenArray = [];
                for (let val of Object.values(responseData)) {
                    tokenArray.push(val);
                }
                this.token = tokenArray[2];
                console.log(this.token);
                return this.token;
            }),
            mergeMap(token => this.http.get(this.petfinderURL,
                {headers: new HttpHeaders({ Authorization: `Bearer ${token}`})}
                )
            )
        ).subscribe((resData:any) => {
            this.petService.setPetList(resData.animals);
            // this.petService.petListChange.next(this.petService.petData);
            console.log(this.petService.petData);
        })
    }
    getListOfPetsWithPhotos(): Observable<PetModel[]> {
      // Assuming the API returns pet data including photos
      return this.http.get<PetModel[]>(`${this.petfinderURL}/pets-with-photos`);
    }
    getPetById(id: number) {
        this.http.post(this.petfinderOAuthURL, this.tokenRequestBody)
        .pipe(
            map(responseData => {
                let tokenArray = [];
                for (let val of Object.values(responseData)) {
                    tokenArray.push(val);
                }
                this.token = tokenArray[2];
                console.log(this.token);
                return this.token;
            }),
            mergeMap(token => this.http.get(`${this.petfinderURL}${id}`,
                {headers: new HttpHeaders({ Authorization: `Bearer ${token}`})}
                )
            )
        ).subscribe((resData:any) => {
            // this.singlePet = resData.animal;
            // console.log(this.singlePet);
            const foundPet = resData.animal;
            console.log(foundPet)
            return foundPet;
        })
    }
}
