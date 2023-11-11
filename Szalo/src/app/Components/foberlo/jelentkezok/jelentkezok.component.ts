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

  szerzodesForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    kezdido: this.formBuilder.control(new Date(), [Validators.required]),
    vegido: this.formBuilder.control(new Date(), [Validators.required]),
    kaucio: this.formBuilder.control(0, [Validators.required]),
    gazOraGyariszam: this.formBuilder.control(0, [Validators.required]),
    villanyOraGyariszam: this.formBuilder.control(0, [Validators.required]),
    vizOraGyariszam: this.formBuilder.control(0, [Validators.required]),
    gazOraKezdoAllas: this.formBuilder.control(0, [Validators.required]),
    villanyOraKezdoAllas: this.formBuilder.control(0, [Validators.required]),
    vizOraKezdoAllas: this.formBuilder.control(0, [Validators.required])
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
