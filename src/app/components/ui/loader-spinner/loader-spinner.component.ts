import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.css'],
})
export class LoaderSpinnerComponent {
  @Input() isLoading: boolean = false;
}
