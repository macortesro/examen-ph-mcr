import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AvisosFormComponent } from 'src/app/componentes/avisos-form/avisos-form.component';
import { AvisosListComponent } from 'src/app/componentes/avisos-list/avisos-list.component';
import { AvisoService } from 'src/app/servicios/aviso.service';
import { Aviso } from 'src/app/clases/aviso';
import { Router } from '@angular/router';


@Component({
    selector: 'app-creacion',
    templateUrl: './creacion.page.html',
    styleUrls: ['./creacion.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, AvisosFormComponent]
})
export class CreacionPage implements OnInit {

  listaAvisos:Aviso[] = []

  constructor(
    private avisoService:AvisoService,
    private router: Router
  ) { }

  ngOnInit() {
    this._actualizar();
  }

  private async _actualizar() {
    try {
      this.listaAvisos = await this.avisoService.getAvisos();
    } catch (error) {
      console.error("Error al obtener los avisos:", error);
    }
  }

  async onCreateAviso(nuevoAviso: Aviso) {
    this.avisoService.agregarAviso(nuevoAviso);
    this._actualizar();
  }

}
 

