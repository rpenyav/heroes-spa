import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../../edit/edit.component';
import { DeleteComponent } from '../../delete/delete.component';
import { SuperHeroesService } from '../../../services/super-heroes.service';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css'],
})
export class HeroCardComponent {
  @Input() superhero: any;
  imageLoaded: boolean = false;

  constructor(
    private dialog: MatDialog,
    private superHeroesService: SuperHeroesService
  ) {}

  openEditModal(superheroId: number) {
    this.superHeroesService.setSelectedSuperHeroId(superheroId);

    const dialogRef = this.dialog.open(EditComponent, {
      width: '60%',
      height: '600px',
      disableClose: true,
    });
  }

  openDeleteModal(superheroId: number) {
    this.superHeroesService.setSelectedSuperHeroId(superheroId);
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '30%',
      height: '400px',
      disableClose: true,
    });
  }

  onImageLoad() {
    this.imageLoaded = true;
  }
}
