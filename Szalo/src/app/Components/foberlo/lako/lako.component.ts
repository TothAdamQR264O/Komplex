import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BerloDTO, EsemenyDTO, FoberloDTO, HazDTO, SzerzodesDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { EsemenyService } from 'src/app/services/esemeny.service';
import { SzerzodesService } from 'src/app/services/szerzodes.service';

@Component({
  selector: 'app-lako',
  templateUrl: './lako.component.html',
  styleUrls: ['./lako.component.css']
})
export class LakoComponent {
  visable = true;
  isNewEvent = true;

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
  esemenyek: EsemenyDTO[] = [];

  esemenyForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    datum: this.formBuilder.control(new Date(), [Validators.required]),
    koltseg: this.formBuilder.control(0, [Validators.required]),
    koltsvis: this.formBuilder.control("", [Validators.required]),
    alapot: this.formBuilder.control("", [Validators.required]),
    megjegyzes: this.formBuilder.control("", [Validators.required]),
    dokumentum: this.formBuilder.control(this.szerzodes),
  })
  
  constructor(
    public authService: AuthService,
    private toastrService: ToastrService,
    private szerzodesService: SzerzodesService,
    private formBuilder: FormBuilder,
    private esemenyService: EsemenyService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['hazId'];
    if (id) {
      this.szerzodesService.getTulaj(id).subscribe({
        next: (szerzodes) => {
          this.Szer = szerzodes;
        },
        error: (err) => {
          console.error(err);
          this.toastrService.error('A ház adatok betöltése sikertelen.', 'Hiba');
        }
      });

      this.esemenyService.getAll().subscribe({
        next: (esemeny) => this.esemenyek = esemeny,
        error: (err) => {
          console.error(err);
          this.toastrService.error('Nem létezik esemény, vagy nem lehet betölteni0', 'Hiba');
        }
      })
    }
  }

  eventMake(){
    this.visable = false;
  }

  canceled() {
    this.visable = true;
  }
  

  saveEvent() {
    const eve = this.esemenyForm.value as EsemenyDTO;

    /*if (!this.valueValidate()) {
      return;
    }*/

    if (this.isNewEvent) {
      this.esemenyService.create(eve).subscribe({
        next: (eve) => {
          this.toastrService.success('Esemény felvitele sikeresen megtörtént', 'Siker');
          //this.router.navigateByUrl('/home');
        },
        error: (err) => {
          this.toastrService.error('Nem sikerült felvinni az adatokat.', 'Hiba');
        }
      });
      this.visable = true;
    }
    else {
      this.esemenyService.update(eve).subscribe({
        next: (eve) => {
          this.toastrService.success('Ház adaainak megváltoztatása sikeresen megtörtént', 'Siker');
          //this.router.navigateByUrl('/home');
        },
        error: (err) => {
          this.toastrService.error('Nem sikerült megváltoztatni az adatokat.', 'Hiba');
        }
      });
      this.visable = true;
    }
    //location.reload();
  }

  changeVisable(): boolean {
    return this.visable;
  }


}
