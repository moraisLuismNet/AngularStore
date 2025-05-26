## AngularStore

**AngularStore** is a web application that provides a user interface for managing categories and products. The application requires users to log in to access its features (Category Management and Product Management). This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.14.

![AngularStore](img/UML.png)

AngularStore/  
├───app/  
│   ├───guards/  
│   │   └───auth-guard.service.ts  
│   ├───interfaces/  
│   │   └───login.interface.ts  
│   ├───services/  
│   │   └───app.service.ts  
│   ├───shared/  
│   │   ├───navbar/  
│   │   │   ├───navbar.component.html  
│   │   │   └───navbar.component.ts  
│   │   └───shared.module.ts  
│   ├───start/  
│   │   ├───login/  
│   │   │   ├───login.component.css  
│   │   │   ├───login.component.html  
│   │   │   └───login.component.ts  
│   │   ├───not-found/  
│   │   │   ├───not-found.component.css  
│   │   │   ├───not-found.component.html  
│   │   │   └───not-found.component.ts  
│   │   └───start.module.ts  
│   ├───store/  
│   │   ├───categories/  
│   │   │   ├───categories.component.html  
│   │   │   └───categories.component.ts  
│   │   ├───products/  
│   │   │   ├───products.component.html  
│   │   │   └───products.component.ts  
│   │   ├───store.component.html  
│   │   ├───store.component.ts  
│   │   ├───store.interfaces.ts  
│   │   ├───store.module.ts  
│   │   ├───store.service.ts  
│   │   └───store-routing.module.ts  
│   ├───app.component.html  
│   ├───app.component.ts  
│   ├───app.module.ts  
│   └───app-routing.module.ts  
├───environments/  
│   ├───environment.development.ts  
│   └───environment.ts  
└───angular.json  

![AngularStore](img/1.png)
![AngularStore](img/2.png)


## environment

```
export const environment = {urlAPI: 'https://localhost:7177/api/'};
export const environment = {urlAPI: 'https://localhost:44342/api/'};
```

[DeepWiki moraisLuismNet/AngularStore](https://deepwiki.com/moraisLuismNet/AngularStore)

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

