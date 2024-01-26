import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  public title = 'country';
  public countriesView = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}
}
