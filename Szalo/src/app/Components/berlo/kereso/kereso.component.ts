import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BerloDTO, FoberloDTO, HazDTO, JelentkezesDTO} from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FoberloService } from 'src/app/services/foberlo.service';
import { HouseService } from 'src/app/services/house.service';
import { JelentkezService } from 'src/app/services/jelentkez.service';

@Component({
  selector: 'app-kereso',
  templateUrl: './kereso.component.html',
  styleUrls: ['./kereso.component.css']
})
export class KeresoComponent {
  hazak: HazDTO[] = [];
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

  visable = true;
  szures = false;
  szerep = this.authService.getRole;

  

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

    if(!this.szures){
      this.hazak.splice(0);
      this.houseService.getAd().subscribe({
        next: (haz) => {
          this.hazak = haz;
        },
        error: (err) => {
          console.error(err);
          this.toastrService.error('A hirdetések betöltése sikertelen.', 'Hiba');
        }
      });
    }
    else{
      this.hazak.splice(0);
      var maxAr = 9999999999;

      if(Number(this.keresForm.value.maximumAr) > 0){
        maxAr = Number(this.keresForm.value.maximumAr);
      }


      this.houseService.getAd().subscribe({
        next: (haz) => {
          if(Number(this.keresForm.value.szobakszama) == 0){
            for(var index in haz)
            { 
              if(haz[index].ar >= Number(this.keresForm.value.minimuAr) && haz[index].ar <= maxAr){
                this.hazak.push(haz[index]);
              }
            }
          }
          else if (Number(this.keresForm.value.szobakszama) > 0){
            for(var index in haz)
            { 
              if(haz[index].ar >= Number(this.keresForm.value.minimuAr) && haz[index].ar <= maxAr && haz[index].szobakszama == Number(this.keresForm.value.szobakszama)){
                this.hazak.push(haz[index]);
              }
            }
          }
          else if(Number(this.keresForm.value.szobakszama) == 0 && Number(this.keresForm.value.minimuAr) == 0 && Number(this.keresForm.value.maximumAr) == 0){
            this.reloadPage();
          }
        },
        error: (err) => {
          console.error(err);
          this.toastrService.error('A hirdetések betöltése sikertelen.', 'Hiba');
        }
      });
    }
  }

  details(id: number) {
    this.houseService.getOne(id).subscribe({
      next: (haz) => {
        this.haziko = haz;
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('A ház adatok betöltése sikertelen.', 'Hiba');
      }
    });
    this.visable = false;
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

  canceled() {
    this.visable = true;
  }

  keresRoom(){
    this.szures = true;
    this.ngOnInit();
  }

  reloadPage() {
    setTimeout(()=>{
      window.location.reload();
    }, 100);
  }

  compareObjects(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.id == obj2.id;
  }

  changeVisable(): boolean {
    return this.visable;
  }

  showAppy(): boolean {
    if(this.szerep() == "berlo"){
      return true;
    }
    else{
      return false;
    }
  }
  
}
