import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { SuperHeroesService } from '../../services/super-heroes.service';
import { XMenCharacter } from '../../model/characters';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';
import { DeleteComponent } from '../delete/delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
  superheroId: number | null = null;
  superhero: XMenCharacter | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private superHeroesService: SuperHeroesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');

      if (idParam === null) {
        this.router.navigate(['/404']);
      } else {
        this.superheroId = +idParam;
        this.superhero = this.superHeroesService.getHeroeById(this.superheroId);
      }
    });
  }

  openEditModal(superheroId: number) {
    this.superHeroesService.setSelectedSuperHeroId(superheroId);

    const dialogRef = this.dialog.open(EditComponent, {
      width: '60%',
      height: '600px',
      disableClose: true,
    });
    dialogRef.componentInstance.modifyFromDetail = true;
  }

  openDeleteModal(superheroId: number) {
    this.superHeroesService.setSelectedSuperHeroId(superheroId);
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '30%',
      height: '400px',
      disableClose: true,
    });
    dialogRef.componentInstance.deleteFromDetail = true;
  }

  copyPageUrlToClipboard() {
    const pageUrl = window.location.href;

    const textArea = document.createElement('textarea');
    textArea.value = pageUrl;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      this.snackBar.open('URL of page copied to clipboard', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } catch (err) {
      console.error('Could not copy to clipboard: ', err);
    } finally {
      document.body.removeChild(textArea);
    }
  }
}
