import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EsemenyDTO, HaviosszesitoDTO, OsszesitoLehetosegDTO, SzerzodesDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { EsemenyService } from 'src/app/services/esemeny.service';
import { HaviosszesitoService } from 'src/app/services/haviosszesito.service';
import { SzamlaService } from 'src/app/services/szamla.service';
import { SzerzodesService } from 'src/app/services/szerzodes.service';

import moment from 'moment';

@Component({
  selector: 'app-lako',
  templateUrl: './lako.component.html',
  styleUrls: ['./lako.component.css']
})
export class LakoComponent {
  visable = true;
  isNewEvent = true;

  szerzodesId!: number;
  szerzodes?: SzerzodesDTO;
  esemenyek: EsemenyDTO[] = [];
  osszesitok: HaviosszesitoDTO[] = [];
  osszesitoLehetosegek: OsszesitoLehetosegDTO[] = [];

  osszesitoLehetoseg!: OsszesitoLehetosegDTO;

  esemenyForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    datum: this.formBuilder.control(moment().format("YYYY-MM-DD"), [Validators.required]),
    tipus: this.formBuilder.control("", [Validators.required]),
    rendhasz: this.formBuilder.control(true, [Validators.required]),
    koltseg: this.formBuilder.control(0, [Validators.required]),
    koltsvis: this.formBuilder.control("", [Validators.required]),
    allapot: this.formBuilder.control("", [Validators.required]),
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
    private szamlaService: SzamlaService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.szerzodesId = this.activatedRoute.snapshot.params['szerzodesId'];

    this.szerzodesService.getOne(this.szerzodesId).subscribe({
      next: (szerzodes) => {
        this.szerzodes = szerzodes;
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('A szerződési adatok betöltése sikertelen.', 'Hiba');
      }
    });

    this.esemenyService.getAll(this.szerzodesId).subscribe({
      next: (esemeny) => this.esemenyek = esemeny,
      error: (err) => {
        console.error(err);
        this.toastrService.error('Nem létezik esemény, vagy nem lehet betölteni', 'Hiba');
      }
    })

    this.osszesitokFrissitese();
  }

  eventMake() {
    this.router.navigate(['/event']);
  }

  canceled() {
    this.visable = true;
  }

  osszesitokFrissitese() {
    this.haviosszesitoService.getAll(this.szerzodesId).subscribe({
      next: (osszesitok) => this.osszesitok = osszesitok,
      error: (err) => {
        console.error(err);
      }
    })

    this.haviosszesitoService.getLehetosegek(this.szerzodesId).subscribe({
      next: (lehetosegek) => {
        this.osszesitoLehetosegek = lehetosegek;
        if (lehetosegek.length > 0) {
          this.osszesitoLehetoseg = lehetosegek[0];
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  saveEvent() {
    const eve = this.esemenyForm.value as EsemenyDTO;

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
  }

  changeVisable(): boolean {
    return this.visable;
  }

  osszesitoGeneralas() {
    if (this.szerzodes) {
      this.haviosszesitoService.create(this.szerzodes.id, this.osszesitoLehetoseg).subscribe({
        next: () => {
          this.toastrService.success('Az összesítő sikeresen létre lett hozva.', 'Siker');
          this.osszesitokFrissitese();
        },
        error: (err) => this.toastrService.error(err.error.error, 'Hiba')
      });
    }
  }

  szamlaLetoltes(id: number) {
    this.szamlaService.letoltes(id);
  }

  osszesitoFizetes(id: number) {
    this.haviosszesitoService.fizetve(id).subscribe({
      next: () => {
        this.toastrService.success('A változás rögzítésre került.', 'Siker')
        this.osszesitokFrissitese();
      },
      error: () => this.toastrService.error('Hiba a mentés során.', 'Hiba')
    });
  }

  osszesitoMegtekintes(osszesitoId: number) {
    this.router.navigate([ 'osszesito', osszesitoId ]);
  }

  goToEvent(id: number) {
    this.router.navigate(['event', id]);
  }
}
