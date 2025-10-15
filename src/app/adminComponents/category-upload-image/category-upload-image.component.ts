import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { ImageUploadService } from '../../Services/image-upload.service';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-category-upload-image',
  templateUrl: './category-upload-image.component.html',
  styleUrl: './category-upload-image.component.scss',
})
export class CategoryUploadImageComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  @Output() image = new EventEmitter<File>();

  private languageService = inject(LanguageService);
  UploadImage: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }
  // Trigger the hidden file input
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  // Handle file selection and preview
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.image.emit(fileInput.files[0]);
    }
  }

  updateTitles() {
    this.UploadImage = this.languageService.UploadImage;
  }
}
