import { UsuariosService } from './../../Services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private usuariosService:UsuariosService, private router:Router,
    private alertController:AlertController, private loadingController:LoadingController) { }
lisUsuario:any;
cedula:any;
contrasenia:any;

  ngOnInit() {
    
  }
  credencialesIncorrectas() {

    this.alertController.create({
      header: 'ERROR',
     
      message: 'USUARIO O CONTRASEÑA INCORRECTOS',
      buttons: ['OK']
    }).then(res => {

      res.present();

    });

  }



  credenciales(){
if (this.contrasenia == undefined || this.cedula == undefined ) {
  this.credencialesIncorrectas();
}else if (this.contrasenia.length <1 || this.contrasenia <1) {
  this.credencialesIncorrectas();
}else {
    //console.log(this.cedula.length);
    //console.log(this.contrasenia.length);
    this.usuariosService.getcredenciales(this.cedula,this.contrasenia).subscribe(res=>{
//console.log(res);
this.lisUsuario = res;
if (res['HttpResponse'].status == 200) {

  this.loading();
  //this.router.navigate(["/certificados"]);
  //localStorage.setItem("usuario",JSON.stringify(this.lisUsuario))
  this.cedula='';
 this.contrasenia='';
}else{
 // console.log("no entro");
  this.credencialesIncorrectas();
}

    });


  }
}


async loading() {
  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'INICIANDO SESIÓN. . .',
    duration: 1500,
    spinner:'bubbles'
  
    
  });
  
  
   await loading.present();

  setTimeout(() => {
    this.router.navigate(["/certificados"]);
  localStorage.setItem("usuario",JSON.stringify(this.lisUsuario))
  }, 1500);
}

}
