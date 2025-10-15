import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boxes-layout',
  templateUrl: './boxes-layout.component.html',
  styleUrl: './boxes-layout.component.scss',
})
export class BoxesLayoutComponent {
  @Input({ required: true }) headers!: string[];
}
