import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BerloDTO, EsemenyDTO, FoberloDTO, HazDTO, SzerzodesDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { EsemenyService } from 'src/app/services/esemeny.service';
import { SzerzodesService } from 'src/app/services/szerzodes.service';

@Component({
  selector: 'app-lakas',
  templateUrl: './lakas.component.html',
  styleUrls: ['./lakas.component.css']
})
export class LakasComponent {
  Szer: SzerzodesDTO[] = [];
  esemenyek: EsemenyDTO[] = [];

  constructor(
    public authService: AuthService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private esemenyService: EsemenyService,
    private router: Router,
    private szerodesService: SzerzodesService
  ) { }


  ngOnInit(): void {
    this.szerodesService.getBerlo().subscribe({
      next: (szerzodes) => {
        this.Szer = szerzodes;
      },
      error: (err) => {
        this.toastrService.error('A házak lista betöltésében hiba keletkezett.', 'Hiba');
      }
    });

    this.esemenyService.getBerlo().subscribe({
      next: (esemeny) => {
        this.esemenyek = esemeny;
      },
      error: (err) => {
        this.toastrService.error('Az események lista betöltésében hiba keletkezett.', 'Hiba');
      }
    });
  }

  eventMake() {
    this.router.navigate(['/event']);
  }

}
