import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HazDTO} from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-kereso',
  templateUrl: './kereso.component.html',
  styleUrls: ['./kereso.component.css']
})
export class KeresoComponent {
  hazak: HazDTO[] = [];
  szures = false;

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
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}


  ngOnInit(): void {

    if(!this.szures){
      this.hazak.splice(0);
      this.houseService.getAd().subscribe({
        next: (haz) => {
          this.hazak = haz;
          console.log(haz);
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

  selectRoom(){
    
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
  
}
