import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Aviso } from 'src/app/clases/aviso';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardContent, ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CamaraComponent } from '../camara/camara.component';
import { AvisoService } from 'src/app/servicios/aviso.service';
import { addIcons } from 'ionicons';
import { cameraOutline } from 'ionicons/icons'
import { Photo } from '@capacitor/camera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avisos-form',
  templateUrl: './avisos-form.component.html',
  styleUrls: ['./avisos-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]

})
export class AvisosFormComponent  implements OnInit {

  aviso: Aviso = { titulo: '', descripcion: '', imagen: '', fechaCreacion: new Date()  };
  mensajeErrorTitulo: string = '';
  mensajeErrorDescripcion: string= '';
  foto: Photo | null = null;

  @Output() onCreate = new EventEmitter<Aviso>()

  constructor(
    private avisoService:AvisoService,
    private modalController: ModalController,
    private router: Router 
  ) { 
    addIcons({
      cameraOutline})
  }


  ngOnInit() {
    this.foto = this.avisoService.getFotoSeleccionada();
  }

  onClick() {
    if (this.foto) {
//  mostrar la imagen en tu formulario antes de guardar el aviso
      console.log('Mostrar la imagen antes de guardar el aviso:', this.foto.webPath);
    }

    if (this.validarFormulario()) {
      this.aviso.imagen = this.foto?.webPath || '';
      this.onCreate.emit(this.aviso);
      this.aviso = { titulo: '', descripcion: '', imagen: '', fechaCreacion: new Date() };
      this.foto = null;
      this.router.navigate(['/home']); // Para que cuando se guarde el aviso, se retorne automaticamente al home
    }
  }

  validarFormulario(): boolean {
    this.mensajeErrorTitulo = '';
    this.mensajeErrorDescripcion = '';

    if (this.aviso.titulo.trim().length < 5) {
      this.mensajeErrorTitulo= 'El titulo debe tener al menos 5 caracteres.';
    }

    if (this.aviso.descripcion.trim().length < 20) {
      this.mensajeErrorDescripcion = 'La descripcion debe tener al menos 20 caracteres.';
    }

    return this.mensajeErrorTitulo=== '' && this.mensajeErrorDescripcion === '';
  }

   // ABRIR MODAL CÁMARA

   async abrirModalCamara() {
    const modal = await this.modalController.create({
      component: CamaraComponent,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.foto) {
        this.mostrarFoto(result.data.foto);
      }
    });

    return await modal.present();
  }

  mostrarFoto(foto: Photo) {
    this.foto = foto;
  }




}
