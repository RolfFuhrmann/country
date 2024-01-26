import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './back-button.component.html'
})
export class BackButtonComponent {}
