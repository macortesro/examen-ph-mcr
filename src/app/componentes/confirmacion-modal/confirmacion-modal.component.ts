import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-confirmacion-modal',
  templateUrl: './confirmacion-modal.component.html',
  styleUrls: ['./confirmacion-modal.component.scss'],
  standalone: true,
  imports: [IonicModule ]
})
export class ConfirmacionModalComponent  implements OnInit {

  @Input() mensaje: string = '';

  constructor(private modalController: ModalController) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  confirmar() {
    this.modalController.dismiss({ confirmado: true });
  }

  cancelar() {
    this.modalController.dismiss({ confirmado: false });
  }

}
