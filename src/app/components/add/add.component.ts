import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Power } from 'src/app/model/characters';

import { SuperHeroesService } from 'src/app/services/super-heroes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  public newSuperHero: any = {
    name: '',
    originalname: '',
    strength: 0,
    class: '',
    description: '',
  };

  newPower: any = {
    name: '',
    description: '',
  };

  powers: any[] = [];

  isValidForm: boolean = false;

  constructor(
    private superHeroesService: SuperHeroesService,
    private dialogRef: MatDialogRef<AddComponent>
  ) {}

  ngOnInit() {
    this.superHeroesService.loadPowers().subscribe((powers) => {
      this.powers = powers;
    });
  }

  validateForm() {
    this.isValidForm =
      this.newSuperHero.name &&
      this.newSuperHero.originalname &&
      this.newSuperHero.strength &&
      this.newSuperHero.class &&
      this.newSuperHero.description
        ? true
        : false;
  }

  capitalizeField(event: any, field: string) {
    const value = event.target.value;
    this.newSuperHero[field] = value.charAt(0).toUpperCase() + value.slice(1);
  }

  onImageSelected(imageUrl: string) {
    this.newSuperHero.picture = imageUrl;
  }

  cancelCreate() {
    this.dialogRef.close();
    this.powers = [];
    this.superHeroesService.clearPowers();
  }

  createSuperHero() {
    this.newSuperHero.powers = [...this.powers];
    this.superHeroesService.addSuperheroe(this.newSuperHero);
    this.powers = [];
    this.superHeroesService.savePowers(this.powers);
    this.dialogRef.close();
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
