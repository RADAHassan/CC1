import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  clientForm: FormGroup;
  loading = false;
  selectedClient: Client | null = null;
  isEditing = false;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService
  ) {
    this.clientForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      adresse: ['']
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.loading = true;
    this.clientService.getClients().subscribe({
      next: (clients) => {
        this.clients = clients;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des clients', error);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.clientForm.invalid) {
      return;
    }

    const clientData = this.clientForm.value;
    
    if (this.isEditing && this.selectedClient?._id) {
      // Mise à jour d'un client existant
      this.clientService.updateClient(this.selectedClient._id, clientData).subscribe({
        next: () => {
          this.loadClients();
          this.resetForm();
        },
        error: (error) => console.error('Erreur lors de la mise à jour du client', error)
      });
    } else {
      // Création d'un nouveau client
      this.clientService.createClient(clientData).subscribe({
        next: () => {
          this.loadClients();
          this.resetForm();
        },
        error: (error) => console.error('Erreur lors de la création du client', error)
      });
    }
  }

  selectClient(client: Client): void {
    this.selectedClient = client;
    this.isEditing = true;
    this.clientForm.patchValue({
      nom: client.nom,
      prenom: client.prenom,
      email: client.email,
      telephone: client.telephone || '',
      adresse: client.adresse || ''
    });
  }

  deleteClient(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          this.loadClients();
          if (this.selectedClient?._id === id) {
            this.resetForm();
          }
        },
        error: (error) => console.error('Erreur lors de la suppression du client', error)
      });
    }
  }

  resetForm(): void {
    this.clientForm.reset();
    this.selectedClient = null;
    this.isEditing = false;
  }
}