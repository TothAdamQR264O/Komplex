import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BerloService } from 'src/app/services/berlo.service';
import { FoberloService } from 'src/app/services/foberlo.service';
import { FoberloDTO, BerloDTO } from 'models';

@Component({
  selector: 'app-regisztralas',
  templateUrl: './regisztralas.component.html',
  styleUrls: ['./regisztralas.component.css']
})
export class RegisztralasComponent {
  foberloForm = this.formBuilder.group({
    nev: this.formBuilder.control('', [Validators.required]),
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', [Validators.required]),
    szamlaszam: this.formBuilder.control('', [Validators.required]),
    telefonszam: this.formBuilder.control<number | null>(null, [Validators.required]),
    bank: this.formBuilder.control('', [Validators.required]),
  });

  berloForm = this.formBuilder.group({
    nev: this.formBuilder.control('', [Validators.required]),
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', [Validators.required]),
    telefonszam: this.formBuilder.control<number | null>(null, [Validators.required]),
    irsz: this.formBuilder.control<number | null>(null, [Validators.required, Validators.min(1000), Validators.max(9999)]),
    telepules: this.formBuilder.control('', [Validators.required]),
    cim: this.formBuilder.control('', [Validators.required]),
  });

  valasztottSzerepkor: 'foberlo' | 'berlo' | null = null;

  szerepkorok = [
    {
      label: 'Főbérlő',
      value: 'foberlo'
    },
    {
      label: 'Bérlő',
      value: 'berlo'
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private foberloService: FoberloService,
    private berloService: BerloService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  szerepkorValtas(szerepkor: 'foberlo' | 'berlo' | null) {
    this.valasztottSzerepkor = szerepkor;
  }

  valueValidate(): boolean {
    if (this.valasztottSzerepkor == 'foberlo') {
      this.foberloForm.markAllAsTouched();
      return this.foberloForm.valid;
    }
    else {
      this.berloForm.markAllAsTouched();
      return this.berloForm.valid;
    }
  }

  saveUser() {
    if (!this.valueValidate()) {
      this.toastrService.error('A megadott adatok hibásak.', 'Hiba');
      return;
    }

    if (this.valasztottSzerepkor === 'foberlo') {
      const foberlo = this.foberloForm.value as FoberloDTO;
      this.foberloService.create(foberlo).subscribe({
        next: (foberlo) => {
          this.toastrService.success('Regisztráció sikeresen megtörtént', 'Siker');
        },
        error: (err) => {
          this.toastrService.error('A regisztráció nem sikerült.', 'Hiba');
        }
      });
    }

    if (this.valasztottSzerepkor === 'berlo') {
      const berlo = this.berloForm.value as BerloDTO;
      this.berloService.create(berlo).subscribe({
        next: (berlo) => {
          this.toastrService.success('Regisztráció sikeresen megtörtént', 'Siker');
        },
        error: (err) => {
          this.toastrService.error('A regisztráció nem sikerült.', 'Hiba');
        }
      });
    }

    this.goToPage("/");
  }
}
