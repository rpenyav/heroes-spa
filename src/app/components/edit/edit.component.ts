import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SuperHeroesService } from '../../services/super-heroes.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy {
  private superHeroSubscription: Subscription | null = null;
  public superhero: any;
  public superheroImage: string | undefined;

  modifyFromDetail = false;
  public isLoading: boolean = false;

  constructor(
    private superHeroesService: SuperHeroesService,
    private dialogRef: MatDialogRef<EditComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.superHeroSubscription =
      this.superHeroesService.selectedSuperHeroId$.subscribe((id) => {
        if (id !== null) {
          const { picture } = this.superHeroesService.getHeroeById(id);
          this.superheroImage = picture;
          this.superhero = this.superHeroesService.getHeroeById(id);
        }
      });
  }

  ngOnDestroy() {
    if (this.superHeroSubscription) {
      this.superHeroSubscription.unsubscribe();
    }
  }

  capitalizeName(event: any) {
    const value = event.target.value;
    this.superhero.name = value.charAt(0).toUpperCase() + value.slice(1);
  }

  cancelEdition() {
    if (this.modifyFromDetail) {
      window.location.reload();
    }
    this.modifyFromDetail = false;
    this.dialogRef.close();
  }

  onImageSelected(imageUrl: string) {
    this.superheroImage = imageUrl;
  }

  saveChanges() {
    if (this.superhero) {
      this.isLoading = true;

      const updatedHero = { ...this.superhero };
      this.superHeroesService.updateHeroeById(updatedHero.id, updatedHero);

      if (this.superheroImage) {
        this.superHeroesService.updateSuperHeroImage(
          updatedHero.id,
          this.superheroImage
        );
      }

      this.snackBar.open('The changes have been made successfully', 'OK', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

      setTimeout(() => {
        this.isLoading = false;
        if (this.modifyFromDetail) {
          window.location.reload();
        }
        this.dialogRef.close();
      }, 1000);
    }
  }
}
