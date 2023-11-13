import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EsemenyDTO,  HaviosszesitoDTO,  OsszesitoLehetosegDTO, SzerzodesDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SzerzodesService } from 'src/app/services/szerzodes.service';

@Component({
  selector: 'app-lakas',
  templateUrl: './lakas.component.html',
  styleUrls: ['./lakas.component.css']
})
export class LakasComponent {
  szerzodesek: SzerzodesDTO[] = [];
  esemenyek: EsemenyDTO[] = [];
  osszesitok: HaviosszesitoDTO[] = [];

  osszesitoLehetosegek: OsszesitoLehetosegDTO[] = [];

  constructor(
    public authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private szerodesService: SzerzodesService
  ) { }

  ngOnInit(): void {
    this.szerodesService.getBerlo().subscribe({
      next: (szerzodes) => {
        this.szerzodesek = szerzodes;
      },
      error: (err) => {
        this.toastrService.error('A házak lista betöltésében hiba keletkezett.', 'Hiba');
      }
    });
  
  }

  reszletek(szerzodesId: number) {
    this.router.navigate(['resident', szerzodesId ]);
  }
}
