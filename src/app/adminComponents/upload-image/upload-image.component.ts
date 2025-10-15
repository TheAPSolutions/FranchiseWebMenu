import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  input,
  inject,
  WritableSignal,
  signal,
} from '@angular/core';
import { ImageUploadService } from '../../Services/image-upload.service';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  previewUrl: string | ArrayBuffer | null = null;
  isModalOpen = false; // To control the modal popup
  input_size = input.required<string>();
  @Output() imageUploaded: EventEmitter<File> = new EventEmitter<File>();
  uploadedImageUrl: string | null = null;
  constructor(private imageUploadService: ImageUploadService) {}
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

  // Handle file selection, preview, and WebP conversion
  async onFileSelected(event: Event): Promise<void> {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];

      // Preview the original image
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(selectedFile);

      // Convert the file to WebP using canvas
      const webpFile = await this.convertToWebP(selectedFile);

      // Emit the WebP file to the parent component
      this.imageUploaded.emit(webpFile);
    }
  }

  // Function to convert image to WebP using HTML canvas
  convertToWebP(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        img.src = e.target?.result as string;
      };

      reader.readAsDataURL(file);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          // Convert canvas content to WebP format
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const webpFile = new File(
                  [blob],
                  `${file.name.split('.').slice(0, -1).join('.')}.webp`,
                  {
                    type: 'image/webp',
                  }
                );
                resolve(webpFile);
              } else {
                reject('Failed to convert image to WebP');
              }
            },
            'image/webp',
            0.8 // quality, adjust as needed
          );
        }
      };

      img.onerror = () => {
        reject('Failed to load image');
      };
    });
  }

  // Open and close modal to view image
  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  // Reset the preview and file input
  resetImage(): void {
    this.previewUrl = null;
    this.fileInput.nativeElement.value = '';
  }

  updateTitles(){
    this.UploadImage = this.languageService.UploadImage;
  }
}
