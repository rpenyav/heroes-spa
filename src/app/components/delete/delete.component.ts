import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SuperHeroesService } from '../../services/super-heroes.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit, OnDestroy {
  private superHeroSubscription: Subscription | null = null;
  public superhero: any = {};
  deleteFromDetail = false;
  public isLoading: boolean = false;

  constructor(
    private superHeroesService: SuperHeroesService,
    private dialogRef: MatDialogRef<DeleteComponent>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.superHeroSubscription =
      this.superHeroesService.selectedSuperHeroId$.subscribe((id) => {
        if (id !== null) {
          this.superhero = this.superHeroesService.getHeroeById(id);
        }
      });
  }

  ngOnDestroy() {
    if (this.superHeroSubscription) {
      this.superHeroSubscription.unsubscribe();
    }
  }

  confirmDelete() {
    if (this.superhero) {
      this.isLoading = true;

      const deleted = this.superHeroesService.deleteHeroeById(
        this.superhero.id
      );

      if (deleted) {
        this.superHeroesService.dataUpdatedSource.next(true);

        this.snackBar.open('The hero has been deleted successfully', 'OK', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

        setTimeout(() => {
          this.isLoading = false;
          if (this.deleteFromDetail) {
            this.router.navigate(['/list']);
          }

          this.dialogRef.close();
        }, 1000);
      } else {
        this.snackBar.open('Error deleting hero', 'OK', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });

        setTimeout(() => {
          this.isLoading = false;
          this.dialogRef.close();
        }, 1000);
      }
    }
  }

  cancelDelete() {
    this.dialogRef.close();
  }
}
