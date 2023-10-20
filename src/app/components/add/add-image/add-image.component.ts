import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css'],
})
export class AddImageComponent implements OnInit {
  @Input() imageUrl: string | null = null;
  @Input() superheroImage: string | null = null; // Agregar esta línea
  @Output() imageSelected = new EventEmitter<string>();

  ngOnInit() {
    // Verifica si imageUrl no está informada y superheroImage tiene un valor
    if (!this.imageUrl && this.superheroImage) {
      // Asigna el valor de superheroImage a imageUrl
      this.imageUrl = this.superheroImage;
    }

    console.log(this.superheroImage);
  }

  onUrlEntered() {
    // Validar que la URL es válida si es necesario
    // Por ejemplo, puedes verificar si la URL contiene "http://" o "https://"
    // También puedes agregar otras validaciones según tus requisitos
    if (this.imageUrl) {
      this.imageSelected.emit(this.imageUrl);
    }
  }
}
