import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BerloDTO, FoberloDTO, HazDTO, SzerzodesDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SzerzodesService } from 'src/app/services/szerzodes.service';

@Component({
  selector: 'app-lakas',
  templateUrl: './lakas.component.html',
  styleUrls: ['./lakas.component.css']
})
export class LakasComponent {
  Szer: SzerzodesDTO[] = [];

  constructor(
    public authService: AuthService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
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
  }

}
