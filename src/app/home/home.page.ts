import { Component } from '@angular/core';
import { AvisosListComponent } from "../componentes/avisos-list/avisos-list.component";
import { Aviso } from '../clases/aviso';
import { AvisoService } from '../servicios/aviso.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { IonIcon } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [RouterModule,IonicModule,AvisosListComponent]
})
export class HomePage {

  listaAvisos:Aviso[] = []


  constructor(
    private avisoService:AvisoService,
    private router: Router
  ) {
    addIcons({
      addOutline
    })
  }

  ngOnInit() {
    this._actualizar();
  }



  private _actualizar() {
    this.listaAvisos = this.avisoService.getAvisos();
  }
  
  async onCreateAviso(nuevoAviso: Aviso) {
    nuevoAviso.fechaCreacion = new Date();
    this.avisoService.agregarAviso(nuevoAviso);
    this._actualizar();
  }
}
