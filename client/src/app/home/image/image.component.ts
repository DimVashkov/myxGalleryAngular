import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Image } from '../image.interface';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input() image?: Image;
  @Input() index?: number;

  @Output() onImageSelect = new EventEmitter<number>();

  onClick(): void {
    this.onImageSelect.emit(this.index);
  }
}
