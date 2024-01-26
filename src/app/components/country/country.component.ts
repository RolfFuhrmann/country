import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Country } from '../../model/country';
import { CountryService } from '../../services/country.service';
import { BackButtonComponent } from '../buttons/back-button/back-button.component';
import { CountryHeaderComponent } from '../country-header/county-header.component';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    CountryHeaderComponent,
    BackButtonComponent
  ],
  templateUrl: './country.component.html'
})
export class CountryComponent
  implements OnInit, AfterViewInit, AfterContentChecked
{
  public countryForm = new FormGroup({});

  public name = new FormControl('', {
    validators: [createCharacterOnlyValidator()],
    updateOn: 'change'
  });

  public continent = new FormControl('', {
    validators: [createCharacterOnlyValidator()],
    updateOn: 'change'
  });

  @ViewChild('countryNameInput')
  public countryNameInput!: ElementRef;

  public constructor(
    private readonly changeDetector: ChangeDetectorRef,
    private readonly countryService: CountryService,
    private readonly router: Router
  ) {
    this.countryForm.addControl('name', this.name);
    this.countryForm.addControl('continent', this.continent);
  }

  public ngAfterViewInit(): void {
    this.countryNameInput.nativeElement.focus();
  }

  public ngOnInit(): void {
    this.changeDetector.detach();
  }

  public ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  public submitCountryForm(): void {
    this.countryService
      .addCountry(this.countryForm.value as Country)
      .subscribe({
        complete: () => {
          this.router.navigateByUrl('/country/countries');
        },
        error: (error: HttpErrorResponse) => {
          error.status === 201
            ? this.router.navigateByUrl('/country/countries')
            : console.log(error);
        }
      });
  }

  public getErrorMessageForCountryName(): string {
    return this.prepareErrorMessage(this.name);
  }

  public getErrorMessageForContinentName(): string {
    return this.prepareErrorMessage(this.continent);
  }

  private prepareErrorMessage(control: AbstractControl): string {
    let message = '';

    if (control.hasError('required')) {
      message = 'You must enter a value';
    }

    if (control.hasError('hasNumeric')) {
      message = 'Not a valid name';
    }
    return message;
  }
}

export function createCharacterOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasNumeric = /\d+/;
    if (control.value) {
      control.markAsTouched();
    }
    return hasNumeric.test(control.value) ? { 'hasNumeric': true } : null;
  };
}
