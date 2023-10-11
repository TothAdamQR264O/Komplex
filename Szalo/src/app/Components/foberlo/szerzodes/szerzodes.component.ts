import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BerloDTO, FoberloDTO, HazDTO, JelentkezesDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { JelentkezService } from 'src/app/services/jelentkez.service';
import { SzerzodesService } from 'src/app/services/szerzodes.service';

@Component({
  selector: 'app-szerzodes',
  templateUrl: './szerzodes.component.html',
  styleUrls: ['./szerzodes.component.css']
})
export class SzerzodesComponent {
  fberlo: FoberloDTO = ({
    id: 0,
    namefb: '',
    email: '',
    password: '',
    szamlaszamfb: '',
    telfb: 0
  });
  haziko: HazDTO = ({
    id: 0,
    hrsz: "",
    irsz: 0,
    telepules: "",
    cim: "",
    reszi: 0,
    ar: 0,
    szobakszama: 0,
    meret: 0,
    tulaj: this.fberlo,
    alapot: "",
    konfort: "",
    emelet: 0,
    szint: 0,
    lift: "",
    legkondi: "",
    butorozott: "",
    koltozheto: "",
    minberido: 0,
    fureswc: "",
    kilatas: "",
    erkelymeret: 0,
    gepesitet: "",
    hirdet: "",
  });
  berlo: BerloDTO = ({
    id: 0,
    nameb: '',
    email: '',
    password: '',
    szamlaszamb: '',
    telb: 0
  });

  jelentkezo: JelentkezesDTO = ({
    id: 0,
    berlo: this.berlo,
    haz: this.haziko,
  });

  constructor(
    public authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private szerzodesService: SzerzodesService,
    private jelentkezService: JelentkezService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    console.log("ID kint: " + id)
    if (id) {
      this.jelentkezService.getOne(id).subscribe({
        next: (apply) => {
          this.jelentkezo = apply;
          console.log("ID bent: " + id)
        },
        error: (err) => {
          console.error(err);
          this.toastrService.error('A jelentkező adatai betöltése sikertelen.', 'Hiba');
        }
      });
    }
  }

}
