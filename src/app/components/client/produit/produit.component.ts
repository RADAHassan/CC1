import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../models/produit.model';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  produits: Produit[] = [];
  produitForm: FormGroup;
  loading = false;
  selectedProduit: Produit | null = null;
  isEditing = false;

  constructor(
    private formBuilder: FormBuilder,
    private produitService: ProduitService
  ) {
    this.produitForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0.01)]],
      description: [''],
      quantiteStock: ['', [Validators.required, Validators.min(0)]],
      categorie: ['']
    });
  }

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    this.loading = true;
    this.produitService.getProduits().subscribe({
      next: (produits) => {
        this.produits = produits;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des produits', error);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.produitForm.invalid) {
      return;
    }

    const produitData = this.produitForm.value;
    
    if (this.isEditing && this.selectedProduit?._id) {
      // Mise à jour d'un produit existant
      this.produitService.updateProduit(this.selectedProduit._id, produitData).subscribe({
        next: () => {
          this.loadProduits();
          this.resetForm();
        },
        error: (error) => console.error('Erreur lors de la mise à jour du produit', error)
      });
    } else {
      // Création d'un nouveau produit
      this.produitService.createProduit(produitData).subscribe({
        next: () => {
          this.loadProduits();
          this.resetForm();
        },
        error: (error) => console.error('Erreur lors de la création du produit', error)
      });
    }
  }

  selectProduit(produit: Produit): void {
    this.selectedProduit = produit;
    this.isEditing = true;
    this.produitForm.patchValue({
      nom: produit.nom,
      prix: produit.prix,
      description: produit.description || '',
      quantiteStock: produit.quantiteStock,
      categorie: produit.categorie || ''
    });
  }

  deleteProduit(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit?')) {
      this.produitService.deleteProduit(id).subscribe({
        next: () => {
          this.loadProduits();
          if (this.selectedProduit?._id === id) {
            this.resetForm();
          }
        },
        error: (error) => console.error('Erreur lors de la suppression du produit', error)
      });
    }
  }

  resetForm(): void {
    this.produitForm.reset();
    this.selectedProduit = null;
    this.isEditing = false;
  }
  
  getStockClass(quantite: number): string {
    if (quantite <= 0) {
      return 'text-danger';
    } else if (quantite < 10) {
      return 'text-warning';
    } else {
      return 'text-success';
    }
  }
}