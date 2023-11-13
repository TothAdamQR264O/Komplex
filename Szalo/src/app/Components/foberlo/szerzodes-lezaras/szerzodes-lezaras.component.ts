import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SzerzodesDTO, SzerzodesZarasDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { SzerzodesService } from 'src/app/services/szerzodes.service';

@Component({
  selector: 'app-szerzodes-lezaras',
  templateUrl: './szerzodes-lezaras.component.html',
  styleUrls: ['./szerzodes-lezaras.component.css']
})
export class SzerzodesLezarasComponent implements OnInit {
  szerzodes?: SzerzodesDTO;

  szerzodesZarasForm = this.formBuilder.group({
    szerzodesId: this.formBuilder.control(0),
    gazOraZaroAllas: this.formBuilder.control(0),
    villanyOraZaroAllas: this.formBuilder.control(0),
    vizOraZaroAllas: this.formBuilder.control(0)
  });

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private szerzodesService: SzerzodesService,
    private toastrService: ToastrService) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.szerzodesZarasForm.patchValue({ szerzodesId: parseInt(id) });

    if (id) {
      this.szerzodesService.getOne(parseInt(id)).subscribe({
        next: (szerzodes) => {
          this.szerzodes = szerzodes;
        },
        error: (err) => {
          this.toastrService.error('Hiba a szerződés betöltésekor.', 'Hiba');
        }
      });
    }
  }

  szerzodesZaras() {
    const beallitasok = this.szerzodesZarasForm.value as SzerzodesZarasDTO;
    this.szerzodesService.zaras(beallitasok).subscribe({
      next: () => {
        this.toastrService.success('A szerződés sikeresen lezárásra került.', 'Siker');
      },
      error: (err) => {
        this.toastrService.error(err.error.error, 'Hiba');
      }
    })
  }
}
