import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'; // Import the MatToolbarModule
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-county-header',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './country-header.component.html'
})
export class CountryHeaderComponent implements OnInit {
  public countriesView = true;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.countriesView = this.route.snapshot.url.length === 0;
  }
}
