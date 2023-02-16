import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { Images } from './resource.interface';
import { Image } from './image.interface';

const SCROLL_THRESHOLD = 10;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public images!: Images;
  public selectedImageIndex = -1;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollTop = this.document.documentElement.scrollTop;
    const scrollHeight = this.document.documentElement.scrollHeight;
    const clientHeight = this.document.documentElement.clientHeight;
    if (scrollTop + clientHeight + SCROLL_THRESHOLD >= scrollHeight) {
      this.loadMore();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (this.selectedImageIndex > -1) {
      switch (event.key) {
        case 'Escape':
          this.onClose();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          this.prev();
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.next();
          break;
      }
    }
  }

  constructor(
    private service: HomeService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.service
      .getImages()
      ?.pipe(
        tap((images) => {
          this.images = images;
          this.images.resources = this.service.transformImages(
            this.images.resources
          );
        })
      )
      .subscribe();
  }

  loadMore(): void {
    this.service
      .getImages(this.images?.next_cursor)
      ?.pipe(
        tap((newImages) => {
          this.images.resources = [
            ...this.images.resources,
            ...this.service.transformImages(newImages.resources),
          ];
          this.images.next_cursor = newImages.next_cursor;
        })
      )
      .subscribe();
  }

  selectImage(imageIndex: number) {
    this.selectedImageIndex = imageIndex;
  }

  prev(): void {
    this.selectedImageIndex--;
  }

  next(): void {
    this.selectedImageIndex++;
  }

  onClose(): void {
    this.selectedImageIndex = -1;
  }

  onFileUploaded(image: Image): void {
    this.images.resources.unshift(...this.service.transformImages([image]));
  }

  onStarImage(): void {
    const isStarred = (
      this.images.resources[this.selectedImageIndex].context.custom.starred ===
      'false'
    ).toString();

    this.service
      .starImage(
        this.images.resources[this.selectedImageIndex].public_id,
        isStarred
      )
      .subscribe();

    this.images.resources[this.selectedImageIndex].context.custom.starred =
      isStarred;
  }

  onDeleteImage(): void {
    this.service
      .deleteImage(this.images.resources[this.selectedImageIndex].public_id)
      .subscribe();

    this.images.resources.splice(this.selectedImageIndex, 1);
    this.selectedImageIndex = -1;
  }
}
