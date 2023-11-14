import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EsemenyDTO, SzerzodesDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { EsemenyService } from 'src/app/services/esemeny.service';
import moment from 'moment';
import { Location } from '@angular/common';
import { SzerzodesService } from 'src/app/services/szerzodes.service';

@Component({
  selector: 'app-esemeny',
  templateUrl: './esemeny.component.html',
  styleUrls: ['./esemeny.component.css']
})
export class EsemenyComponent {
  szerzodes?: SzerzodesDTO;

  esemeny?: EsemenyDTO;

  ujEsemeny = true;

  esemenyForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    datum: this.formBuilder.control(moment().format('YYYY-MM-DD'), [Validators.required]),
    tipus: this.formBuilder.control("", [Validators.required]),
    rendhasz: this.formBuilder.control(true, [Validators.required]),
    koltseg: this.formBuilder.control(0, [Validators.required]),
    koltsegviselo: this.formBuilder.control("", [Validators.required]),
    allapot: this.formBuilder.control("", [Validators.required]),
    megjegyzes: this.formBuilder.control("", [Validators.required]),
    zarasDatum: this.formBuilder.control(moment().format('YYYY-MM-DD')),
    dokumentum: this.formBuilder.control(this.szerzodes),
  });

  tipusok = [
    {
      label: 'Tervezett karbantartás',
      value: 'Tervezett'
    },
    {
      label: 'Váratlan esemény',
      value: 'Váratlan'
    },
    {
      label: 'Egyéb',
      value: 'Egyéb'
    },
  ];

  constructor(
    public authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private esemenyService: EsemenyService,
    private szerzodesService: SzerzodesService,
    private activatedRoute: ActivatedRoute,
    public location: Location
  ) { }

  ngOnInit(): void {
    const szerzodesId = this.activatedRoute.snapshot.params['contractId'];
    if (szerzodesId) {
      this.szerzodesService.getOne(szerzodesId).subscribe({
        next: szerzodes => this.szerzodes = szerzodes,
        error: () => this.toastrService.error('A szerződés nem tölthető be.', 'Hiba')
      });
    }

    const id = this.activatedRoute.snapshot.params['eventId'];
    if (id) {
      this.ujEsemeny = false;

      this.esemenyService.getOne(id).subscribe({
        next: (event) => {
          this.esemeny = event;
          this.esemenyForm.setValue(event);
        },
        error: (err) => {
          console.error(err);
          this.toastrService.error('Az esemény betöltése sikertelen.', 'Hiba');
        }
      });
    }

    if (this.authService.getRole() == 'berlo') {
      this.esemenyForm.disable();
    }
  }

  saveEvent() {
    if (!this.szerzodes) {
      return;
    }

    const esemeny = this.esemenyForm.value as EsemenyDTO;

    if (this.ujEsemeny) {
      this.esemenyService.create(this.szerzodes.id, esemeny).subscribe({
        next: (apply) => {
          this.toastrService.success('Az esemény sikeresen létre lett hozva.', 'Siker');
          this.location.back();
        },
        error: (err) => {
          this.toastrService.error('Nem sikerült létrehozni az eseményt.', 'Hiba');
        }
      });
    } else {
      this.esemenyService.update(esemeny).subscribe({
        next: (apply) => {
          this.toastrService.success('Az esemény sikeresen módosult.', 'Siker');
          this.location.back();
        },
        error: (err) => {
          this.toastrService.error('Nem sikerült módosítani az eseményt.', 'Hiba');
        }
      });
    }
  }

}
