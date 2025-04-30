// components/shared/footer.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="bg-light py-3 mt-4">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6">
            <p class="mb-0">&copy; {{ currentYear }} Gestion App. Tous droits réservés.</p>
          </div>
          <div class="col-md-6 text-end">
            <p class="mb-0">Développé avec Angular et Express</p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      border-top: 1px solid #e9ecef;
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}