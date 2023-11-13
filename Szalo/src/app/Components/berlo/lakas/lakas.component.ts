import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BerloDTO, EsemenyDTO, FoberloDTO, HaviosszesitoDTO, HazDTO, OsszesitoLehetosegDTO, SzerzodesDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { EsemenyService } from 'src/app/services/esemeny.service';
import { HaviosszesitoService } from 'src/app/services/haviosszesito.service';
import { SzamlaService } from 'src/app/services/szamla.service';
import { SzerzodesService } from 'src/app/services/szerzodes.service';

@Component({
  selector: 'app-lakas',
  templateUrl: './lakas.component.html',
  styleUrls: ['./lakas.component.css']
})
export class LakasComponent {
  Szer: SzerzodesDTO[] = [];
  esemenyek: EsemenyDTO[] = [];
  osszesitok: HaviosszesitoDTO[] = [];
  osszesitoLehetosegek: OsszesitoLehetosegDTO[] = [];
  osszesitoLehetoseg!: OsszesitoLehetosegDTO;
  szerzodesId!: number;

  constructor(
    public authService: AuthService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private esemenyService: EsemenyService,
    private router: Router,
    private haviosszesitoService: HaviosszesitoService,
    private szamlaService: SzamlaService,
    private szerodesService: SzerzodesService
  ) { }


  ngOnInit(): void {
    this.szerzodesId = this.activatedRoute.snapshot.params['szerzodesId'];
    this.szerodesService.getBerlo().subscribe({
      next: (szerzodes) => {
        this.Szer = szerzodes;
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
