import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  
  szerzodes?: SzerzodesDTO;
  sze: SzerzodesDTO[] = [];
  sze2: SzerzodesDTO[] = [];
  esemenyek: EsemenyDTO[] = [];

  esemenyForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    datum: this.formBuilder.control(new Date(), [Validators.required]),
    tipus: this.formBuilder.control("", [Validators.required]),
    rendhasz: this.formBuilder.control("", [Validators.required]),
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
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['szerzodesId'];
    console.log("Az ID értéke: " + id);
    this.szerzodesService.getAll().subscribe({
      next: (szerzodes) => {
        for(var index in szerzodes){
          console.log(index + ". lekérés ID-je: " + szerzodes[index].hid.id)
          if(szerzodes[index].hid.id == id){
            this.sze.push(szerzodes[index]);
          }
        }
        console.log(this.szerzodes)
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('A szerződési adatok betöltése sikertelen.', 'Hiba');
      }
    });

    this.szerzodesService.getTulaj(id).subscribe({
      next: (szerzodes) => {
        this.sze2 = szerzodes;
        console.log(this.szerzodes)
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('A szerződési adatok betöltése sikertelen.', 'Hiba');
      }
    });

    this.esemenyService.getAll().subscribe({
      next: (esemeny) => this.esemenyek = esemeny,
      error: (err) => {
        console.error(err);
        this.toastrService.error('Nem létezik esemény, vagy nem lehet betölteni', 'Hiba');
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


}
