import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  api="https://www.certificados.gruposurcapacitacion.com/api/";
  //api="http://127.0.0.1:8000/api/";
  
  constructor(private httpClient:HttpClient) { }

  getUsuarios(){

    return this.httpClient.get(this.api+'devuelveUsuarios');
  }
  getcredenciales(usuario:any, password:any){

    return this.httpClient.get(this.api+'credenciales/'+usuario+'/'+password);
  }
  

  devuelvecursosxUsuario(usuario:any){

    return this.httpClient.get(this.api+'devuelvecursosxUsuario/'+usuario);
  }

  devuelvecertificadosxcurso(idCurso:any){

    return this.httpClient.get(this.api+'devuelvecertificadosxcurso/'+idCurso);
  }
}
