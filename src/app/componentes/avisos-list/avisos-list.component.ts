import { Component, Input, OnInit } from '@angular/core';
import { Aviso } from 'src/app/clases/aviso';
import { AvisoService } from 'src/app/servicios/aviso.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons'
import { ConfirmacionModalComponent } from '../confirmacion-modal/confirmacion-modal.component';
import { CamaraComponent } from '../camara/camara.component';

@Component({
  selector: 'app-avisos-list',
  templateUrl: './avisos-list.component.html',
  styleUrls: ['./avisos-list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class AvisosListComponent  implements OnInit {

  @Input() avisos:Aviso[] = []
  
  constructor(
    private avisoService:AvisoService,
    private modalController: ModalController
  ) {
    addIcons({
      trashOutline
  })
  }

  ngOnInit(): void {
    this.cargarAvisos();
  }

  async cargarAvisos(): Promise<void> {
    this.avisos = await this.avisoService.getAvisos();
  }

  eliminarAviso(index: number) {
    this.avisoService.eliminarAviso(index);
    this.cargarAvisos(); 
  }

   // Confirmar Eliminar con ventana modal 

  
 async confirmarEliminar(index: number) {
  const modal = await this.modalController.create({
    component: ConfirmacionModalComponent,
    componentProps: {
      mensaje: '¿Estás seguro de que deseas eliminar la publicación?'
    }
  });

  await modal.present();

  const { data } = await modal.onWillDismiss();
  
  if (data && data.confirmado) {
    this.avisoService.eliminarAviso(index);
    await this.cargarAvisos(); 
  }
}




}
