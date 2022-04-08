import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, Welcome } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'lfB3ajG4o4oCAkAIAYiiz6vAwG8b7iB8'
  private _serviceUrl: string = 'https://api.giphy.com/v1/gifs'
  private _historial: string[] = []



  public resultados: Gif[] = []

  get historial(){
    return [...this._historial]
  }

  constructor(private http: HttpClient) {
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!)
      this.resultados = JSON.parse(localStorage.getItem('resultados')!)
    }
  }  

  buscarGifs(query: string){
    query = query.trim().toLowerCase()

    if(!this._historial.includes(query)){

      this._historial.unshift(query)
      this._historial = this._historial.slice(0, 10)
      localStorage.setItem('historial', JSON.stringify(this._historial))
    }   

    const params = new HttpParams()
                    .set('api_key', this._apiKey)
                    .set('limit', '10')
                    .set('q', query)

    this.http.get<Welcome>(`${this._serviceUrl}/search`, {params})
      .subscribe((resp) => {
        this.resultados = resp.data
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })
    console.log(this._historial)
  }

  
}
