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
  szures = false;

  keresForm = this.formBuilder.group({
    minimuAr: this.formBuilder.control(0),
    maximumAr: this.formBuilder.control(0),
    ferohely: this.formBuilder.control(0),
  });

  constructor(
    private houseService: HouseService,
    public authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

/*
  ngOnInit(): void {

    if(!this.szures){
      this.szobak.splice(0);
      this.szobaService.getAll().subscribe({
        next: (szoba) => {
          for(var index in szoba)
            { 
              if(szoba[index].kiado == 'Igen'){
                this.szobak.push(szoba[index]);
                console.log(szoba[index]);
              }
            }
        },
        error: (err) => {
          console.error(err);
          this.toastrService.error('A szobák betöltése sikertelen.', 'Hiba');
        }
      });
    }
    else{
      this.szobak.splice(0);
      var maxAr = 9999999999;

      if(Number(this.keresForm.value.maximumAr) > 0){
        maxAr = Number(this.keresForm.value.maximumAr);
      }


      this.szobaService.getAll().subscribe({
        next: (szoba) => {
          if(Number(this.keresForm.value.ferohely) == 0){
          for(var index in szoba)
            { 
              if(szoba[index].kiado == 'Igen' && szoba[index].ar >= Number(this.keresForm.value.minimuAr) && szoba[index].ar <= maxAr){
                this.szobak.push(szoba[index]);
              }
            }
          }
          else if (Number(this.keresForm.value.ferohely) > 0){
            for(var index in szoba)
            { 
              if(szoba[index].kiado == 'Igen'&& szoba[index].ar >= Number(this.keresForm.value.minimuAr) && szoba[index].ar <= maxAr && szoba[index].ferohely == Number(this.keresForm.value.ferohely)){
                this.szobak.push(szoba[index]);
              }
            }
          }
          else if(Number(this.keresForm.value.ferohely) == 0 && Number(this.keresForm.value.minimuAr) == 0 && Number(this.keresForm.value.maximumAr) == 0){
            this.reloadPage();
          }
        },
        error: (err) => {
          console.error(err);
          this.toastrService.error('A szobák betöltése sikertelen.', 'Hiba');
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
  */
}
