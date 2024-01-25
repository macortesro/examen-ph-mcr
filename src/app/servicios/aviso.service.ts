import { Injectable } from '@angular/core';
import { Aviso } from '../clases/aviso';
import { Photo } from '@capacitor/camera';
import { Plugins } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { SQLiteConnection,CapacitorSQLite,SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class AvisoService {

  private _avisos:Aviso[] = [

    new Aviso("Mascota Perdida", "Perrito Salchicha perdido","https://img.freepik.com/vector-gratis/ilustracion-perro-salchicha-dibujos-animados-dibujados-mano_23-2150513541.jpg?w=826&t=st=1705972641~exp=1705973241~hmac=abea2248d275f9e7069dc74d87c359dde8a7b6e15b1bbf1f12946295d30dd39b"),
    new Aviso("Cédula encontrada", "Se encontro esta cédula de identidad en la calle","https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/El_ejemplo_de_Cedula_identidad_Chile_2013.jpg/320px-El_ejemplo_de_Cedula_identidad_Chile_2013.jpg")
  ]

  private fotoSeleccionada: Photo | null = null;

  constructor() { }

 
   // METODOS PARA SET Y GET PARA LA FOTO SELECCIONADA 
  
  setFotoSeleccionada(foto: Photo) {
    this.fotoSeleccionada = foto;
  }

  getFotoSeleccionada(): Photo | null {
    return this.fotoSeleccionada;
  }

  getAvisos(): Aviso[] {
    return this._avisos;
  }



agregarAviso(aviso: Aviso): void {
    const existe = this._avisos.some(a => a.titulo === aviso.titulo && a.descripcion === aviso.descripcion);
    if (!existe) {
      this._avisos.push(aviso);
    }
  }

  eliminarAviso(index: number): void {
    if (index >= 0 && index < this._avisos.length) {
      this._avisos.splice(index, 1);
    }
  }

}
