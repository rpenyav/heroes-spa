import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css'],
})
export class AddImageComponent implements OnInit {
  @Input() imageUrl: string | null = null;
  @Input() superheroImage: string | null = null;
  @Output() imageSelected = new EventEmitter<string>();

  ngOnInit() {
    if (!this.imageUrl && this.superheroImage) {
      this.imageUrl = this.superheroImage;
    }

    console.log(this.superheroImage);
  }

  onUrlEntered() {
    if (this.imageUrl) {
      this.imageSelected.emit(this.imageUrl);
    }
  }
}
