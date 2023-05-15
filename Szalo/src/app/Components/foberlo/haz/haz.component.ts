import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HazDTO, ProductDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-haz',
  templateUrl: './haz.component.html',
  styleUrls: ['./haz.component.css']
})
export class HazComponent {
  hazak: HazDTO[] = [];

  constructor(
    private houseService: HouseService,
    private toasterServices: ToastrService,
    private router: Router
    ) {}

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
          this.toasterServices.error('A házak lista betöltésében hiba keletkezett.', 'Hiba');
        }
      });
    }
}
