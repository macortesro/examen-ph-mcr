import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import {Camera, Photo, CameraResultType } from '@capacitor/camera';
import { AvisoService } from 'src/app/servicios/aviso.service';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule, IonicModule]
})
export class CamaraComponent  implements OnInit {

  @Output() fotoTomada = new EventEmitter<Photo | null>();
  foto: Photo | null = null; 

  async tomarFoto() {
    try {
      const foto = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        saveToGallery: true,
        correctOrientation: true,
      });

      this.foto = foto; // Asignar la foto
      this.fotoTomada.emit(foto);
    } catch (error) {
      console.error('Error al tomar la fotografía:', error);
    } finally {
      this.modalController.dismiss({
        foto: this.foto, 
      });
    }
  }

  constructor(private avisoService: AvisoService, private modalController: ModalController) { }

  ngOnInit() {}


}
