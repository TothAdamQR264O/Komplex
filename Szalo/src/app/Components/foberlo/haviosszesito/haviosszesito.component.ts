import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HaviosszesitoDTO } from 'models';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { HaviosszesitoService } from 'src/app/services/haviosszesito.service';
import { SzamlaService } from 'src/app/services/szamla.service';

@Component({
  selector: 'app-haviosszesito',
  templateUrl: './haviosszesito.component.html',
  styleUrls: ['./haviosszesito.component.css']
})
export class HaviosszesitoComponent {

  osszesito?: HaviosszesitoDTO;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private toastrService: ToastrService,
    private osszesitoService: HaviosszesitoService,
    private szamlaService: SzamlaService) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params['id'];
    if (!id) {
      this.router.navigateByUrl('/');
    }

    this.osszesitoService.get(parseInt(id)).subscribe({
      next: (osszesito) => this.osszesito = osszesito,
      error: (err) => this.toastrService.error('Az összesítő nem tölthető be.', 'Hiba')
    });
  }

  formatDate(date?: Date) {
    return moment(date).format('YYYY-MM-DD');
  }

  szamlaLetoltes(id: number) {
    this.szamlaService.letoltes(id);
  }

  vissza() {
    this.location.back();
  }
}
