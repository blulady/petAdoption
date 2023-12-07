# PetAdoption

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



adopt a pet
- search feature
- auth feature
- users can add animals 
    - upload photos
- users can mark an animal as adopted
- users can mark favorites

what kind of features
    write them out like user stories

        sally wants to login in to the app & look at adoptable animals
        
    once the user stories are created
        decide whats going into a module
        try to flesh out component structure (or build components first & then create module)
        
create the repo
    ng new
    push it up 
German
1. models first (what does our data look like)
2. accounts settings module
3. auth module
4. public model (landing page)
5. frequently commiting our code

* the biggest problem in groups is headbutts?
* in the very beginning, think of models (user model, animal model), feature's are auth... & should be handled by only one dev
  - dash board module
  - account settings feature
* come up with mvp
  - then add fancy things like google maps, address

hard code pets
put a few things in firebase

make an http interceptor
  to run the oauth request to get a token
