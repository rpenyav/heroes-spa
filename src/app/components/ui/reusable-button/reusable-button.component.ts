import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reusable-button',
  templateUrl: './reusable-button.component.html',
  styleUrls: ['./reusable-button.component.css'],
})
export class ReusableButtonComponent {
  constructor(private router: Router) {}

  @Input() buttonPadding: string = '0';
  @Input() buttonHexColor: string | null = null;
  @Input() disabled = false;
  @Input() routerLink: string | any[] | null = null;
  @Output() onClick = new EventEmitter<void>();

  handleClick = () => {
    if (this.disabled) {
      return;
    }

    this.onClick.emit();

    if (this.routerLink !== null) {
      if (typeof this.routerLink === 'string') {
        this.router.navigate([this.routerLink]);
      } else if (Array.isArray(this.routerLink)) {
        this.router.navigate(this.routerLink);
      }
    }
  };
}
