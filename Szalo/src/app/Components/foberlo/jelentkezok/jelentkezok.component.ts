import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JelentkezesDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { JelentkezService } from 'src/app/services/jelentkez.service';

@Component({
  selector: 'app-jelentkezok',
  templateUrl: './jelentkezok.component.html',
  styleUrls: ['./jelentkezok.component.css']
})
export class JelentkezokComponent {
  jelentkezesek: JelentkezesDTO[] = [];

  constructor(
    public authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jelentkezService: JelentkezService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['hazId'];
    if (id) {
      this.jelentkezService.getAll(id).subscribe({
        next: (appy) => {
          this.jelentkezesek = appy;
        },
        error: (err) => {
          console.error(err);
          this.toastrService.error('A ház adatok betöltése sikertelen.', 'Hiba');
        }
      });
    }
  }

  selectApply(id: number) {
    this.router.navigate([ '/contract', id ]);
  }
}
