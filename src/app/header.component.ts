// components/shared/header.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Gestion App</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/clients" routerLinkActive="active">Clients</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/produits" routerLinkActive="active">Produits</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/commandes" routerLinkActive="active">Commandes</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .navbar-brand {
      font-weight: 700;
    }
    .nav-link {
      font-weight: 500;
    }
    .active {
      font-weight: 700;
      position: relative;
    }
    .active::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 3px;
      background-color: white;
    }
  `]
})
export class HeaderComponent {}
