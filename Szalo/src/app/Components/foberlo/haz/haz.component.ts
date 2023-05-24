import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HazDTO, FoberloDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-haz',
  templateUrl: './haz.component.html',
  styleUrls: ['./haz.component.css']
})
export class HazComponent {
  hazak: HazDTO[] = [];
  visable = true;

  hazForm = this.formBuilder.group({
    hrsz: this.formBuilder.control(''),
    cim: this.formBuilder.control(''),
    reszi: this.formBuilder.control(0),
    furdo: this.formBuilder.control(0),
    wc: this.formBuilder.control(0),
    viz: this.formBuilder.control(''),
    melegviz: this.formBuilder.control(''),
    internet: this.formBuilder.control(''),
    tv: this.formBuilder.control(''),
    tuzhely: this.formBuilder.control(''),
    mosogep: this.formBuilder.control(''),
    meret: this.formBuilder.control(0),
    tulaj: this.formBuilder.control<null | FoberloDTO>(null)
  });

  constructor(
    private houseService: HouseService,
    public authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
    ) {}

    logout() {
      this.authService.removeToken();
      this.router.navigateByUrl('/');
      this.toastrService.success('Sikeresen kijelentkezett.', 'Kilépés');
    }

    goToTheRooms(){
      this.router.navigateByUrl('/house');
    }
  
    goToPage(pageName:string):void {
      this.router.navigate([`${pageName}`]);
    }

    ngOnInit(): void {
      this.houseService.getAll().subscribe({
        next: (hazak) => {
          this.hazak = hazak;
          console.log(hazak);
        },
        error: (err) => {
          this.toastrService.error('A házak lista betöltésében hiba keletkezett.', 'Hiba');
        }
      });
    }

  saveHouse() {
    const haz= this.hazForm.value as HazDTO;
    this.houseService.create(haz).subscribe({
      next: (haz) => {
         this.toastrService.success('Ház felvitele sikeresen megtörtént', 'Siker');
      },
      error: (err) => {
        this.toastrService.error('Nem sikerült felvinni az adatokat.', 'Hiba');
      }
    });
    this.visable = true;
  }

  creatHouse(){
    this.visable = false;
  }

  changeVisable(): boolean{
    return this.visable;
  }
}
