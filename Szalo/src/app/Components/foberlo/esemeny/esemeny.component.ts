import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EsemenyDTO, SzerzodesDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { EsemenyService } from 'src/app/services/esemeny.service';
import { SzerzodesService } from 'src/app/services/szerzodes.service';

@Component({
  selector: 'app-esemeny',
  templateUrl: './esemeny.component.html',
  styleUrls: ['./esemeny.component.css']
})
export class EsemenyComponent {
  szerzodes?: SzerzodesDTO;
  esemeny?: EsemenyDTO;
  esemenyForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    datum: this.formBuilder.control(new Date(), [Validators.required]),
    tipus: this.formBuilder.control("", [Validators.required]),
    rendhasz: this.formBuilder.control("", [Validators.required]),
    koltseg: this.formBuilder.control(0, [Validators.required]),
    koltsvis: this.formBuilder.control("", [Validators.required]),
    alapot: this.formBuilder.control("", [Validators.required]),
    megjegyzes: this.formBuilder.control("", [Validators.required]),
    dokumentum: this.formBuilder.control(this.szerzodes),
  })

  constructor(
    public authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private szerzodesService: SzerzodesService,
    private esemenyService: EsemenyService,
    private activatedRoute: ActivatedRoute,
  ) { }

  selectedtipus: any = ';'
  tipusArr = [
    {
      label:'Tervezett',
      value: 'Tervezett'
    },
    {
      label:'Váratlan',
      value: 'Váratlan'
    },
    {
      label:'Egyébb',
      value: 'Egyébb'
    },
  ];

  onRadioChange(event:any){
    
    // Kiválasztja az értéket
    this.selectedtipus = event.target.value;
    if(event.target.value == "Tervezett"){
      this.esemenyForm.value.tipus = event.target.value;
    }else if(event.target.value == "Váratlan"){
      this.esemenyForm.value.tipus = event.target.value;
    }else if(event.target.value == "Egyébb"){
      this.esemenyForm.value.tipus = event.target.value;
    }
  }

  switchVolume = -1;
  onSwicChange(event:any){
    this.switchVolume *=-1;
  }

  rendHaszVolume(){
    if(this.switchVolume == 1){
      this.esemenyForm.value.rendhasz = "Igen";
    }else{
      this.esemenyForm.value.rendhasz = "Nem";
    }
  }


  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    console.log("ID kint: " + id)
    if (id) {
      this.esemenyService.getOne(id).subscribe({
        next: (event) => {
          this.esemeny = event;
          console.log("ID bent: " + id)
        },
        error: (err) => {
          console.error(err);
          this.toastrService.error('Az esemény betöltése sikertelen.', 'Hiba');
        }
      });
    }
  }

  saveEvent(){
    const esemeny = this.esemenyForm.value as EsemenyDTO;
    this.esemenyService.create(esemeny).subscribe({
      next: (apply) => { 
        this.toastrService.success('Az esemény sikeresen létre lett hozva.', 'Siker');
        },
        error: (err) => {
          this.toastrService.error('Nem sikerült létrehozni az eseményt.', 'Hiba');
        }
    });

  }

}