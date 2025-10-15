import { Component, input } from '@angular/core';

@Component({
  selector: 'app-primary-header',
  templateUrl: './primary-header.component.html',
  styleUrl: './primary-header.component.scss'
})
export class PrimaryHeaderComponent {
  title = input.required<string>();
}
