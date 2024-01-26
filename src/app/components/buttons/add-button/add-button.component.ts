import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './add-button.component.html'
})
export class AddButtonComponent {}
