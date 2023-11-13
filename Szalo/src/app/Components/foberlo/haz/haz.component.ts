import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HazDTO, SzerzodesDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HouseService } from 'src/app/services/house.service';

import * as _ from 'lodash';
import { SzerzodesService } from 'src/app/services/szerzodes.service';

@Component({
  selector: 'app-haz',
  templateUrl: './haz.component.html',
  styleUrls: ['./haz.component.css']
})
export class HazComponent {
  hazak: HazDTO[] = [];

  nemHirdetettHazak: HazDTO[] = [];

  sajatSzerzodesek: SzerzodesDTO[] = [];

  constructor(
    private houseService: HouseService,
    public authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private szerzodesService: SzerzodesService
  ) { }


  logout() {
    this.authService.removeToken();
    this.router.navigateByUrl('/');
    this.toastrService.success('Sikeresen kijelentkezett.', 'Kilépés');
  }

  goToTheApplys(id: number) {
    this.router.navigate([ '/appys', id ]);
  }

  goToTheApply(szerzodesId: number) {
    this.router.navigate([ '/resident', szerzodesId ]);
  }
  szerzodesLezaras(szerzodesId: number) {
    this.router.navigate([ '/szerzodes-lezaras', szerzodesId ]);
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(): void {
    this.houseService.getAll().subscribe({
      next: (hazak) => {
        this.hazak = hazak.filter(haz => haz.hirdet === 'Igen');
        this.nemHirdetettHazak = hazak.filter(haz => haz.hirdet == 'Nem');
      },
      error: (err) => {
        this.toastrService.error('A házak lista betöltésében hiba keletkezett.', 'Hiba');
      }
    });

    this.szerzodesService.getTulaj().subscribe({
      next: (szerzodesek) => this.sajatSzerzodesek = szerzodesek,
      error: (err) => this.toastrService.error('Hiba a szerződések betöltésekor.', 'Hiba')
    })
  }

  changeHouseValue(id: number) {
    this.router.navigate(['szerk', id]);
  }

  creatHouse() {
    this.router.navigate(['/szerk']);
  }

}
