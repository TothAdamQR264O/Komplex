import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HazDTO, JelentkezesDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HouseService } from 'src/app/services/house.service';
import { JelentkezService } from 'src/app/services/jelentkez.service';

@Component({
  selector: 'app-jelentkezes-letrehozasa',
  templateUrl: './jelentkezes-letrehozasa.component.html',
  styleUrls: ['./jelentkezes-letrehozasa.component.css']
})
export class JelentkezesLetrehozasaComponent {
  haz?: HazDTO;

  jelentkezes?: JelentkezesDTO;

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
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.houseService.getOne(id).subscribe({
      next: (haz) => {
        this.haz = haz;
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
    if (!this.haz) {
      return;
    }

    this.jelentkezService.create(this.haz.id).subscribe({
      next: (apply) => { 
        this.toastrService.success('A jelentkezés sikeresen megtörtént', 'Siker');
        },
        error: (err) => {
          this.toastrService.error('Nem sikerült jelentkezni.', 'Hiba');
        }
      });
  }

}
