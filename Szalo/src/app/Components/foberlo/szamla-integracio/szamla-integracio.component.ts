import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SzamlaService } from 'src/app/services/szamla.service';

@Component({
  selector: 'app-szamla-integracio',
  templateUrl: './szamla-integracio.component.html',
  styleUrls: ['./szamla-integracio.component.css']
})
export class SzamlaIntegracioComponent implements OnInit {
  statusz = false;
  statuszUzenet = '';
  apiKulcs = '';

  constructor(
    private location: Location,
    private szamlaService: SzamlaService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.szamlaService.integracioStatusz().subscribe({
      next: (statusz) => {
        this.statusz = statusz.result;
        this.statuszUzenet = this.statusz
          ? 'A Számlázz.hu integráció aktív, de lehetősége van megváltoztatni API kulcsát.'
          : 'A Számlázz.hu integráció nem aktív, kérjük állítson be egy API kulcsot!';
      },
      error: (err) => this.toastrService.error('Hiba történt az integráció állapotának lekérdezése során.', 'Hiba')
    });
  }

  integracioLetrehozas(): void {
    if (!this.apiKulcs) {
      this.toastrService.error('API kulcs megadása kötelező!', 'Hiba');
      return;
    }

    this.szamlaService.integracioLetrehozas({ apiKulcs: this.apiKulcs }).subscribe({
      next: res => {
        this.toastrService.success('Az API kulcs mentésre került.', 'Siker');
        this.location.back();
      },
      error: err => this.toastrService.error('Hiba történt az API kulcs mentésekor.', 'Hiba')
    });
  }
}
