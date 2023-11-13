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


  // TODO: oraallasok
  szerzodesForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    kezdido: this.formBuilder.control(new Date(), [Validators.required]),
    vegido: this.formBuilder.control(this.getNowPlus1Year(), [Validators.required]),
    kaucio: this.formBuilder.control(0, [Validators.required]),
    gazOraGyariszam: this.formBuilder.control(0, [Validators.required]),
    villanyOraGyariszam: this.formBuilder.control(0, [Validators.required]),
    vizOraGyariszam: this.formBuilder.control(0, [Validators.required]),
    gazOraKezdoAllas: this.formBuilder.control(0, [Validators.required]),
    villanyOraKezdoAllas: this.formBuilder.control(0, [Validators.required]),
    vizOraKezdoAllas: this.formBuilder.control(0, [Validators.required])
  })

  jelentkezes?: JelentkezesDTO;

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
    if (!this.jelentkezes) {
      return;
    }

    const szerzodes = this.szerzodesForm.value as SzerzodesDTO;
    this.szerzodesService.create(this.jelentkezes.id, szerzodes).subscribe({
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
