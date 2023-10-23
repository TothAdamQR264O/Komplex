import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BerloDTO, EsemenyDTO, FoberloDTO, HaviosszesitoDTO, HazDTO, OsszesitoLehetosegDTO, SzerzodesDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { EsemenyService } from 'src/app/services/esemeny.service';
import { HaviosszesitoService } from 'src/app/services/haviosszesito.service';
import { SzerzodesService } from 'src/app/services/szerzodes.service';

@Component({
  selector: 'app-lako',
  templateUrl: './lako.component.html',
  styleUrls: ['./lako.component.css']
})
export class LakoComponent {
  visable = true;
  isNewEvent = true;

  
  szerzodes?: SzerzodesDTO;
  esemenyek: EsemenyDTO[] = [];
  osszesitok: HaviosszesitoDTO[] = [];
  osszesitoLehetosegek: OsszesitoLehetosegDTO[] = [];

  osszesitoLehetoseg!: OsszesitoLehetosegDTO;

  esemenyForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    datum: this.formBuilder.control("2023-10-23", [Validators.required]),
    tipus: this.formBuilder.control("", [Validators.required]),
    rendhasz: this.formBuilder.control(true, [Validators.required]),
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
    private router: Router,
    private esemenyService: EsemenyService,
    private haviosszesitoService: HaviosszesitoService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const szerzodesId = this.activatedRoute.snapshot.params['szerzodesId'];
    console.log("Az ID értéke: " + szerzodesId);
    this.szerzodesService.getOne(szerzodesId).subscribe({
      next: (szerzodes) => {
        this.szerzodes = szerzodes;
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('A szerződési adatok betöltése sikertelen.', 'Hiba');
      }
    });

    this.esemenyService.getAll(szerzodesId).subscribe({
      next: (esemeny) => this.esemenyek = esemeny,
      error: (err) => {
        console.error(err);
        this.toastrService.error('Nem létezik esemény, vagy nem lehet betölteni', 'Hiba');
      }
    })

    this.haviosszesitoService.getLehetosegek(szerzodesId).subscribe({
      next: (lehetosegek) => this.osszesitoLehetosegek = lehetosegek,
      error: (err) => {
        console.error(err);
      }
    })
  }

  eventMake(){
    this.router.navigate([ '/event' ]);
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

  osszesitoGeneralas() {
    if (this.szerzodes) {
      this.haviosszesitoService.create(this.szerzodes.id, this.osszesitoLehetoseg).subscribe({
        next: () => this.toastrService.success('Az összesítő sikeresen létre lett hozva.', 'Siker'),
        error: () => this.toastrService.error('Nem sikerült létrehozni az összesítőt.', 'Hiba')
      });
    }
  }

  goToEvent(id: number) {
    this.router.navigate([ 'event', id ]);
  }
}
