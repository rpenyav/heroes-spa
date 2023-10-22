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
  public superHeroSubscription: Subscription | null = null;
  public superhero: any;
  public superheroImage: string | undefined;

  newPower: any = {
    name: '',
    description: '',
  };

  powers: any[] = [];

  modifyFromDetail = false;
  public isLoading: boolean = false;
  public isValidForm: boolean = false;

  constructor(
    private superHeroesService: SuperHeroesService,
    private dialogRef: MatDialogRef<EditComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.superHeroSubscription =
      this.superHeroesService.selectedSuperHeroId$.subscribe((id) => {
        if (id !== null) {
          const hero = this.superHeroesService.getHeroeById(id);
          this.superhero = hero;
          this.powers = hero.powers || [];
          this.validateForm();
        }
      });
  }

  ngOnDestroy() {
    if (this.superHeroSubscription) {
      this.superHeroSubscription.unsubscribe();
    }
  }

  validateForm() {
    this.isValidForm =
      this.superhero.name &&
      this.superhero.originalname &&
      this.superhero.strength &&
      this.superhero.class &&
      this.superhero.description
        ? true
        : false;
  }

  capitalizeField(event: any, field: string) {
    const value = event.target.value;
    this.superhero[field] = value.charAt(0).toUpperCase() + value.slice(1);
  }

  cancelEdition() {
    if (this.modifyFromDetail) {
      window.location.reload();
    }

    this.powers = [];
    this.superHeroesService.clearPowers();

    this.modifyFromDetail = false;
    this.dialogRef.close();
  }

  onImageSelected(imageUrl: string) {
    this.superheroImage = imageUrl;
  }

  saveChanges() {
    if (this.superhero) {
      this.isLoading = true;

      const updatedHero = {
        ...this.superhero,
        powers: this.powers,
      };

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

  addPower() {
    this.powers.push({ ...this.newPower });
    this.newPower = {
      name: '',
      description: '',
    };
    this.superHeroesService.savePowers(this.powers);
    this.superHeroesService.loadPowers().subscribe((powers) => {
      this.powers = powers;
    });
  }

  removePower(power: any) {
    const index = this.powers.indexOf(power);
    if (index >= 0) {
      this.powers.splice(index, 1);
      this.superHeroesService.savePowers(this.powers);
    }
  }
}
