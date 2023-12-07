export class petModel {
  public name: string;
  public species: string;
  public description: string;
  public postcode: number;
  public id: number;
  public photo: string;

  constructor(name: string, description: string, species: string, postcode: number, id: number, photo: string,){

    this.name = name;
    this.species = species;
    this.description = description;
    this.postcode = postcode;
    this.id = id;
    this.photo = photo;
  }
}
