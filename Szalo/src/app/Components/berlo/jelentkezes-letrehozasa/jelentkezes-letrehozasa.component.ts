import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FoberloDTO, HazDTO, JelentkezesDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FoberloService } from 'src/app/services/foberlo.service';
import { HouseService } from 'src/app/services/house.service';
import { JelentkezService } from 'src/app/services/jelentkez.service';

@Component({
  selector: 'app-jelentkezes-letrehozasa',
  templateUrl: './jelentkezes-letrehozasa.component.html',
  styleUrls: ['./jelentkezes-letrehozasa.component.css']
})
export class JelentkezesLetrehozasaComponent {

  fberlo: FoberloDTO = ({
    id: 0,
    nev: '',
    email: '',
    password: '',
    szamlaszam: '',
    telefonszam: 0,
    bank: ''
  });
  haziko: HazDTO = ({
    id: 0,
    hrsz: "",
    irsz: 0,
    telepules: "",
    cim: "",
    rezsi: 0,
    ar: 0,
    szobakszama: 0,
    meret: 0,
    tulaj: this.fberlo,
    allapot: "",
    komfort: "",
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
    gepesitett: "",
    hirdet: "",
  });

  jelentkez?: JelentkezesDTO;

  keresForm = this.formBuilder.group({
    minimuAr: this.formBuilder.control(0),
    maximumAr: this.formBuilder.control(0),
    szobakszama: this.formBuilder.control(0),
  });

  constructor(
    private houseService: HouseService,
    public authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private jelentkezService: JelentkezService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private foberloService: FoberloService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.houseService.getOne(id).subscribe({
      next: (haz) => {
        this.haziko = haz;
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('A ház adatok betöltése sikertelen.', 'Hiba');
      }
    });
  }

  canceled(){
    this.router.navigate(['/keres']);
  }

  saveJelentkez(){
    const apply = this.jelentkez as JelentkezesDTO;
    
    this.jelentkezService.create(this.haziko.id).subscribe({
      next: (apply) => { 
        this.toastrService.success('A jelentkezés sikeresen megtörtént', 'Siker');
        },
        error: (err) => {
          this.toastrService.error('Nem sikerült jelentkezni.', 'Hiba');
        }
      });
  }

}
