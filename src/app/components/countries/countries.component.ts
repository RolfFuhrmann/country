import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';
import { Country } from '../../model/country';
import { CountryPushService } from '../../services/country-push.service';
import { CountryService } from '../../services/country.service';
import { AddButtonComponent } from '../buttons/add-button/add-button.component';
import { CountryHeaderComponent } from '../country-header/county-header.component';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    CountryHeaderComponent,
    AddButtonComponent
  ],
  templateUrl: './countries.component.html'
})
export class CountriesComponent implements OnInit {
  public displayColumns: string[] = ['name', 'continent', 'actions'];
  public countriesTableSource = new MatTableDataSource<Country>([]);

  private readonly puschService = this.countryPushService.websocketSubject;

  @ViewChild(MatTable) countryTable!: MatTable<Country>;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly countryService: CountryService,
    private readonly countryPushService: CountryPushService,
    private snackBar: MatSnackBar
  ) {
    this.puschService.subscribe({
      next: () => {
        this.countriesTableSource = new MatTableDataSource<Country>([]);
        this.loadCountries();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  public ngOnInit() {
    this.loadCountries();
  }

  private loadCountries() {
    this.countryService.getCountries().subscribe({
      next: (country: Country) => {
        this.countriesTableSource.data.push(country);
        this.changeDetectorRef.detectChanges();
        this.countryTable.renderRows();
      },
      complete: () => {
        this.changeDetectorRef.detectChanges();
        this.countryTable.renderRows();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }

  public deleteCountry(id: number) {
    const country = this.countriesTableSource.data.find(
      (country) => country.id === id
    );
    if (country !== undefined) {
      this.countryService.deleteCountry(country).subscribe({
        next: () => {
          this.snackBar.open('Das Land wurde erfolgreich gelöscht', 'OK');
        },
        error: (error: unknown) => {
          console.error(error);
        }
      });
    }
  }
}
