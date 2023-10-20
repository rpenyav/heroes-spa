import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccessibilityService {
  private sizOfText = 16;

  maximizeTextSize() {
    if (this.sizOfText < 24) {
      this.sizOfText += 2;
      this.applyTextSize();
    }
  }

  minimizeTextSize() {
    if (this.sizOfText > 12) {
      this.sizOfText -= 2;
      this.applyTextSize();
    }
  }

  obtainTextSize() {
    return this.sizOfText;
  }

  private applyTextSize() {
    document.body.style.fontSize = this.sizOfText + 'px';
  }
}
