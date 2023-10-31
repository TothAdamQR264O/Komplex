import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BerloDTO, FoberloDTO, HazDTO, SzerzodesDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SzerzodesService } from 'src/app/services/szerzodes.service';

@Component({
  selector: 'app-lakas',
  templateUrl: './lakas.component.html',
  styleUrls: ['./lakas.component.css']
})
export class LakasComponent {
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
    telb: 0,
    irsz: 0,
    telepules: '',
    cim: '',
  });
  szerzodes: SzerzodesDTO = ({
    id: 0,
    kezdido: new Date,
    vegido: new Date,
    kaukcio: 0,
    ggyszam: 0,
    agyszam: 0,
    vgyszam: 0,
    gora: 0,
    aora: 0,
    vora: 0,
    tid: this.fberlo,
    bid: this.berlo,
    hid: this.haziko,
  });
  Szer: SzerzodesDTO[] = [];

  constructor(
    public authService: AuthService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private szerodesService: SzerzodesService
  ) { }


  ngOnInit(): void {
    this.szerodesService.getBerlo().subscribe({
      next: (szerzodes) => {
        this.Szer = szerzodes;
      },
      error: (err) => {
        this.toastrService.error('A házak lista betöltésében hiba keletkezett.', 'Hiba');
      }
    });
  }

}
