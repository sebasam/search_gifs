import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  constructor( private gifsService: GifsService ) {}

  @ViewChild('ref') ref!:ElementRef<HTMLInputElement> //operador de typescript ! le estoy diciendo a typescript que confie en mi y que siempre va a tener algo (objeto no nulo)
  buscar(value:String ){
    const val = this.ref.nativeElement.value

    if(val.trim().length === 0){
      return
    }  

    this.gifsService.buscarGifs(val)

    this.ref.nativeElement.value = ''

  }

}
