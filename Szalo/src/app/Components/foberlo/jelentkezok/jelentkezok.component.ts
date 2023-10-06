import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HazDTO, FoberloDTO, JelentkezesDTO, BerloDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FoberloService } from 'src/app/services/foberlo.service';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-jelentkezok',
  templateUrl: './jelentkezok.component.html',
  styleUrls: ['./jelentkezok.component.css']
})
export class JelentkezokComponent {
  berlok: BerloDTO[] = [];
  visable = true;

  szerzodesForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    kezdido: this.formBuilder.control(0, [Validators.required]),
    vegido: this.formBuilder.control(0, [Validators.required]),
    kaukcio: this.formBuilder.control(0, [Validators.required]),
    ggyszam: this.formBuilder.control(0, [Validators.required]),
    agyszam: this.formBuilder.control(0, [Validators.required]),
    vgyszam: this.formBuilder.control(0, [Validators.required]),
    gora: this.formBuilder.control(0, [Validators.required]),
    aora: this.formBuilder.control(0, [Validators.required]),
    vora: this.formBuilder.control(0, [Validators.required]),
  })

  constructor(
    private houseService: HouseService,
    public authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private foberloService: FoberloService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      /*this.houseService.getOne(id).subscribe({
        next: (haz) => this.hazForm.setValue(haz),
        error: (err) => {
          console.error(err);
          this.toastrService.error('A ház adatok betöltése sikertelen.', 'Hiba');
        }
      });*/
    }
  }

  valueValidate(): boolean {
    this.szerzodesForm.markAllAsTouched();
    return this.szerzodesForm.valid;
  }

  saveContract(){

  }

  canceled() {
    this.visable = true;
  }

  selectApply(){
    this.visable = false;
  }


  changeVisable(): boolean {
    return this.visable;
  }

}
