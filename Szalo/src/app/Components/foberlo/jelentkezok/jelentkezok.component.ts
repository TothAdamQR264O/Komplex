import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HazDTO, FoberloDTO, JelentkezesDTO, BerloDTO, SzerzodesDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FoberloService } from 'src/app/services/foberlo.service';
import { HouseService } from 'src/app/services/house.service';
import { JelentkezService } from 'src/app/services/jelentkez.service';
import { formatDate } from '@angular/common';
import { SzerzodesService } from 'src/app/services/szerzodes.service';

@Component({
  selector: 'app-jelentkezok',
  templateUrl: './jelentkezok.component.html',
  styleUrls: ['./jelentkezok.component.css']
})
export class JelentkezokComponent {
  ideiglenesHazID = 0;
  jelentkezesek: JelentkezesDTO[] = [];
  visable = true;
  applyId = -300;
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

  jelentkezo: JelentkezesDTO = ({
    id: 0,
    berlo: this.berlo,
    haz: this.haziko,
  });

  szerzodesForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    kezdido: this.formBuilder.control(new Date(), [Validators.required]),
    vegido: this.formBuilder.control(new Date(), [Validators.required]),
    kaukcio: this.formBuilder.control(0, [Validators.required]),
    ggyszam: this.formBuilder.control(0, [Validators.required]),
    agyszam: this.formBuilder.control(0, [Validators.required]),
    vgyszam: this.formBuilder.control(0, [Validators.required]),
    gora: this.formBuilder.control(0, [Validators.required]),
    aora: this.formBuilder.control(0, [Validators.required]),
    vora: this.formBuilder.control(0, [Validators.required])
  })

  constructor(
    private houseService: HouseService,
    public authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private foberloService: FoberloService,
    private szerzodesService: SzerzodesService,
    private activatedRoute: ActivatedRoute,
    private jelentkezService: JelentkezService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['hazId'];
    if (id) {
      this.ideiglenesHazID = id;
      this.jelentkezService.getAll(id).subscribe({
        next: (appy) => {
          this.jelentkezesek = appy;
        },
        error: (err) => {
          console.error(err);
          this.toastrService.error('A ház adatok betöltése sikertelen.', 'Hiba');
        }
      });
    }
  }


  valueValidate(): boolean {
    this.szerzodesForm.markAllAsTouched();
    return this.szerzodesForm.valid;
  }

  saveContract(){
    /*const apply = this.szerzodesForm.value as SzerzodesDTO;
    console.log(this.jelentkezo.id);
    this.szerzodesService.create(this.jelentkezo.id).subscribe({
      next: (apply) => { 
        this.toastrService.success('A szerződés sikeresen létre lett hozva.', 'Siker');
        },
        error: (err) => {
          this.toastrService.error('Nem sikerült létrehozni a szerződést.', 'Hiba');
        }
    });*/

  }

  canceled() {
    this.visable = true;
  }

  selectApply(id: number) {
    this.router.navigate([ '/contract', id ]);

  }


  changeVisable(): boolean {
    return this.visable;
  }

}
