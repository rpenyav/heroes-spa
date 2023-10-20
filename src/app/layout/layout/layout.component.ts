import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../../components';
import { AccessibilityService } from '../../services/accessibility.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  tamanoTexto = 16;
  constructor(
    public dialog: MatDialog,
    private accessibilityService: AccessibilityService
  ) {}

  openAddModal(): void {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '60%',
      height: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  maxTextSize() {
    this.accessibilityService.maximizeTextSize();
  }

  minTextSize() {
    this.accessibilityService.minimizeTextSize();
  }
}
