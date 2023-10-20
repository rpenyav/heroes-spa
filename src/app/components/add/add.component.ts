import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { SuperHeroesService } from 'src/app/services/super-heroes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  public newSuperHero: any = { name: '' };

  constructor(
    private superHeroesService: SuperHeroesService,
    private dialogRef: MatDialogRef<AddComponent>
  ) {}

  capitalizeName(event: any) {
    const value = event.target.value;
    this.newSuperHero.name = value.charAt(0).toUpperCase() + value.slice(1);
  }

  onImageSelected(imageUrl: string) {
    this.newSuperHero.picture = imageUrl;
  }

  cancelCreate() {
    this.dialogRef.close();
  }

  createSuperHero() {
    this.superHeroesService.addSuperheroe(this.newSuperHero);
  }
}
