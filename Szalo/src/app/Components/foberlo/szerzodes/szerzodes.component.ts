import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JelentkezesDTO, SzerzodesDTO } from 'models';
import moment from 'moment';
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

  szerzodesForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    kezdido: this.formBuilder.control(this.getNow(), [Validators.required]),
    vegido: this.formBuilder.control(this.getNowPlus1Year(), [Validators.required]),
    kaucio: this.formBuilder.control(0, [Validators.required]),
    gazOraGyariszam: this.formBuilder.control(0, [Validators.required]),
    villanyOraGyariszam: this.formBuilder.control(0, [Validators.required]),
    vizOraGyariszam: this.formBuilder.control(0, [Validators.required]),
    gazOraKezdoAllas: this.formBuilder.control(0, [Validators.required]),
    villanyOraKezdoAllas: this.formBuilder.control(0, [Validators.required]),
    vizOraKezdoAllas: this.formBuilder.control(0, [Validators.required])
  });

  jelentkezes?: JelentkezesDTO;

  constructor(
    public authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private szerzodesService: SzerzodesService,
    private jelentkezService: JelentkezService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router
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

  getNow() {
    return moment().format('YYYY-MM-DD');
  }

  getNowPlus1Year() {
    const now = new Date();
    now.setFullYear(now.getFullYear() + 1);

    return moment(now).format('YYYY-MM-DD');
  }

  saveContract() {
    if (!this.jelentkezes) {
      return;
    }

    const szerzodes = this.szerzodesForm.value as any as SzerzodesDTO;
    this.szerzodesService.create(this.jelentkezes.id, szerzodes).subscribe({
      next: (apply) => {
        this.toastrService.success('A szerződés sikeresen létre lett hozva.', 'Siker');
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        this.toastrService.error('Nem sikerült létrehozni a szerződést.', 'Hiba');
      }
    });
  }

  canceled() {
    this.location.back();
  }
}
