import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule,TranslateModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {

  @Input() control: any;
  @Input() typeInput!: string;
  @Input() idInput!: string;
  @Input() labelInput!: string;
  @Input() element: string = "input";
  flag:boolean=true;
}
