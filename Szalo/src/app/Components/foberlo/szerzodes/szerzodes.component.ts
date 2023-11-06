import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BerloDTO, FoberloDTO, HazDTO, JelentkezesDTO, SzerzodesDTO } from 'models';
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
  visable = true;

  fberlo: FoberloDTO = ({
    id: 0,
    namefb: '',
    email: '',
    password: '',
    szamlaszamfb: '',
    telfb: 0,
    bank: ''
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

  // TODO: oraallasok
  szerzodesForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    kezdido: this.formBuilder.control(new Date(), [Validators.required]),
    vegido: this.formBuilder.control(this.getNowPlus1Year(), [Validators.required]),
    kaukcio: this.formBuilder.control(0, [Validators.required]),
    ggyszam: this.formBuilder.control(0, [Validators.required]),
    agyszam: this.formBuilder.control(0, [Validators.required]),
    vgyszam: this.formBuilder.control(0, [Validators.required]),
    gora: this.formBuilder.control(0, [Validators.required]),
    aora: this.formBuilder.control(0, [Validators.required]),
    vora: this.formBuilder.control(0, [Validators.required])
  })

  jelentkezes: JelentkezesDTO = ({
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
    if (id) {
      this.jelentkezService.getOne(id).subscribe({
        next: (apply) => {
          this.jelentkezes = apply;
        },
        error: (err) => {
          console.error(err);
          this.toastrService.error('A jelentkező adatai betöltése sikertelen.', 'Hiba');
        }
      });
    }
  }

  getNowPlus1Year() {
    const now = new Date();
    now.setFullYear(now.getFullYear() + 1);

    return now;
  }


  saveContract(){
    const szerzodes = this.szerzodesForm.value as SzerzodesDTO;
    this.szerzodesService.create(szerzodes).subscribe({
      next: (apply) => { 
        this.toastrService.success('A szerződés sikeresen létre lett hozva.', 'Siker');
        },
        error: (err) => {
          this.toastrService.error('Nem sikerült létrehozni a szerződést.', 'Hiba');
        }
    });

  }

  canceled() {
    this.visable = true;
  }

}
