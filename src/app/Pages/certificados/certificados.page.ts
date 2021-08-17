import { UsuariosService } from './../../Services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { NavController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

pdfMake.vfs=pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.page.html',
  styleUrls: ['./certificados.page.scss'],
})
export class CertificadosPage implements OnInit {

  lisCertificados:any;
  lisCursos:any;
  idCurso:any;
  lisUsuario:any;
  pdfObj:any;
  lis:any;
  //lisSolicitados:any;
  cursoSelec:any;
  formattedDate:string;
  constructor(private usuariosService:UsuariosService,private navController:NavController,
    private router:Router) { }

  ngOnInit() {

 

    //console.log( this.formattedDate);
    this.lisUsuario = JSON.parse(localStorage.getItem("usuario"))['usuarios'];
   
this.lisUsuario = this.lisUsuario[0];
//console.log(this.lisUsuario.nombre)
    this.lisCursos=[];
    this.lisCertificados=[];
    this.cargarCursos();
  }

  cargarCursos(){
    this.usuariosService.devuelvecursosxUsuario(this.lisUsuario.cedula).subscribe(res=>{
this.lisCursos= res;
//console.log(this.lisCursos.certVip)
this.idCurso=this.lisCursos.detalleUsu[0];
//console.log(this.lisCursos.fecha)
 this.cargarCertificados(this.idCurso);
});
  }

  cargarCertificados(item){
this.cursoSelec = item;
    //console.log(item);
    this.usuariosService.devuelvecertificadosxcurso(item.idCurso).subscribe(res=>{
      this.lisCertificados = res;
     // console.log(this.lisCertificados);
    });

  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }
  async crearPDF(cert){
    
//console.log(cert);
if (cert.idCertificado== 1  ) {
  //ACM
  this.pdfACM();
}else if(cert.idCertificado== 2){
//PRIMEROS AUXILISO
this.pdfPA();
}else if(cert.idCertificado== 3){
//DEFENSA PERSONAL
this.pdfDefPer();
}else if(cert.idCertificado== 5){
//INSTRUCCION FORMAL
this.pdfInsrFormal();
}else if(cert.idCertificado== 4){
  //PRIMER NIVEL
  this.pdfPrimernivel();
  }
   
  }

  async crearPDFsolicitados(soli){

     this.lis = soli;
    
    //console.log(soli.idcertificado);
    if (soli.idcertificado== 1  ) {
      //ACM
      this.pdfACM();
    }else if(soli.idcertificado== 2){
    //PRIMEROS AUXILISO
    this.pdfPA();
    }else if(soli.idcertificado== 3){
    //DEFENSA PERSONAL
    this.pdfDefPer();
    }else if(soli.idcertificado== 5){
    //INSTRUCCION FORMAL
    this.pdfInsrFormal();
    }else if(soli.idcertificado== 4){
      //PRIMER NIVEL
      this.pdfPrimernivel();
      }else if(soli.idcertificado== 6){
        //PRIMER NIVEL
        this.pdfEscoltaVip();
        }
       
      }

  async pdfACM()

  { var docDefinition = {
      
           
    pageOrientation: 'landscape',
    pageSize: 'A4',
    background: [
      {
        image: await this.getBase64ImageFromURL(
          "../assets/icon/ACM.jpeg"
        ),
          width: 840
      }
    ],
    content: [
      {
        columns: [
          { margin: [ 0, 120, 0, 5 ],width: '*', text: '' },
          {  margin: [ 0, 120, 0, 5 ],width: 'auto',text: 'A: '+this.lisUsuario.nombre, alignment: 'Center',fontSize: 25,bold:true },
          { width: '*', text: '' }
        ]
      },
      {
        columns: [//iz,arri,dere,aba
          { margin: [ 0, 0, 0, 10 ], width: '*', text: '' },
          {  width: 'auto',text: 'CI: '+this.lisUsuario.cedula, alignment: 'Center',fontSize: 25,bold:true  },
          { width: '*', text: '' }
        ]
      },
      {
        columns: [
          { width: '*', text: '' },
          { bold:true ,margin: [ 0, 140, 0, 5 ],width: 'auto',text: 'Desde:'+this.cursoSelec.fechaInicio+' Hasta: '+this.cursoSelec.fechaFin, alignment: 'Center',fontSize: 15 },
          { width: '*', text: '' },
        ]
      },
      {
        columns: [
          { width: '*', text: '' },
          { bold:true ,width: 'auto',text: 'Fecha de Expedición: '+this.cursoSelec.fecExpedicion, alignment: 'Center',fontSize: 15  },
          { width: '*', text: '' },
        ]
      },

    ]
  };
  this.pdfObj=pdfMake.createPdf(docDefinition);
  //console.log(this.pdfObj);
  this.descargar();
}
async pdfPrimernivel()

{ var docDefinition = {
    
         
  pageOrientation: 'landscape',
  pageSize: 'A4',
  background: [
    {
      image: await this.getBase64ImageFromURL(
        "../assets/icon/PRIMERNIVEL.jpeg"
      ),
        width: 840
    }
  ],
  content: [
    {
      columns: [
        { margin: [ 0, 120, 0, 5 ],width: '*', text: '' },
        {  margin: [ 0, 140, 0, 5 ],width: 'auto',text: 'A: '+this.lisUsuario.nombre, alignment: 'Center',fontSize: 25,bold:true },
        { width: '*', text: '' }
      ]
    },
    {
      columns: [//iz,arri,dere,aba
        { margin: [ 0, 0, 0, 10 ], width: '*', text: '' },
        {  width: 'auto',text: 'CI: '+this.lisUsuario.cedula, alignment: 'Center',fontSize: 25,bold:true  },
        { width: '*', text: '' }
      ]
    },
    {
      columns: [
        { width: '*', text: '' },
        { bold:true ,margin: [ 0, 120, 0, 5 ],width: 'auto',text: 'Desde:'+this.cursoSelec.fechaInicio+' Hasta: '+this.cursoSelec.fechaFin, alignment: 'Center',fontSize: 15 },
        { width: '*', text: '' },
      ]
    },
    {
      columns: [
        { width: '*', text: '' },
        { bold:true ,width: 'auto',text: 'Fecha de Expedición: '+this.cursoSelec.fecExpedicion, alignment: 'Center',fontSize: 15  },
        { width: '*', text: '' },
      ]
    },

  ]
};
this.pdfObj=pdfMake.createPdf(docDefinition);
//console.log(this.pdfObj);
this.descargar();
}

async pdfPA(){
  
  var docDefinition = {
              
    //  pageOrientation: 'landscape',
      pageSize: 'A4',
      background: [
        {
          image: await this.getBase64ImageFromURL(
            "../assets/icon/PRIMEROSAUXILIOS.jpeg"
          ),
            width: 600
        }
      ],
      content: [
        {
          columns: [
            { margin: [ 0, 120, 0, 5 ],width: '*', text: '' },
            {  margin: [ 0, 260, 0, 5 ],width: 'auto',text: 'A: '+this.lisUsuario.nombre, alignment: 'Center',fontSize: 23,bold:true },
            { width: '*', text: '' }
          ]
        },
        {
          columns: [
            { margin: [ 0, 120, 0, 5 ],width: '*', text: '' },
            {  margin: [ 0, 20, 0, 5 ],width: 'auto',text:'CI: '+this.lisUsuario.cedula, alignment: 'Center',fontSize: 23,bold:true },
            { width: '*', text: '' }
          ]
        },
     
       /* {
          columns: [
            { width: '*', text: '' },
            { bold:true ,margin: [ 0, 200, 0, 5 ],width: 'auto',text:'Desde:'+this.cursoSelec.fechaInicio+' Hasta: '+this.cursoSelec.fechaFin, alignment: 'Center',fontSize: 15 },
            { width: '*', text: '' },
          ]
        }, */
        {
          columns: [
            { width: '*', text: '' },
            { bold:true ,margin: [ 0, 110, 0, 5 ],width: 'auto',text: 'Fecha de Expedición: '+this.cursoSelec.fecExpedicion, alignment: 'Center',fontSize: 17 },
            { width: '*', text: '' },
          ]
        },

      ]
    };
    this.pdfObj=pdfMake.createPdf(docDefinition);
    //console.log(this.pdfObj);
    this.descargar();
}
async pdfInsrFormal(){
  var docDefinition = {
              //iz,arri,dere,aba
    //  pageOrientation: 'landscape',
      pageSize: 'A4',
      background: [
        {
          image: await this.getBase64ImageFromURL(
            "../assets/icon/INSTRUCCIONFORMAL.jpeg"
          ),
            width: 600
        }
      ],
      content: [
        {
          columns: [
            { margin: [ 0, 120, 0, 5 ],width: '*', text: '' },
            {  margin: [ 0, 260, 0, 5 ],width: 'auto',text: 'A: '+this.lisUsuario.nombre, alignment: 'Center',fontSize: 23,bold:true },
            { width: '*', text: '' }
          ]
        },
        {
          columns: [
            { margin: [ 0, 120, 0, 5 ],width: '*', text: '' },
            {  margin: [ 0, 20, 0, 5 ],width: 'auto',text:'CI: '+this.lisUsuario.cedula, alignment: 'Center',fontSize: 23,bold:true },
            { width: '*', text: '' }
          ]
        },
     
       /* {
          columns: [
            { width: '*', text: '' },
            { bold:true ,margin: [ 0, 200, 0, 5 ],width: 'auto',text:'Desde:'+this.cursoSelec.fechaInicio+' Hasta: '+this.cursoSelec.fechaFin, alignment: 'Center',fontSize: 15 },
            { width: '*', text: '' },
          ]
        }, */
        {
          columns: [
            { width: '*', text: '' },
            { bold:true ,margin: [ 0, 110, 0, 5 ],width: 'auto',text: 'Fecha de Expedición: '+this.cursoSelec.fecExpedicion, alignment: 'Center',fontSize: 17 },
            { width: '*', text: '' },
          ]
        },

      ]
    };
    this.pdfObj=pdfMake.createPdf(docDefinition);
    //console.log(this.pdfObj);
    this.descargar();
}
async pdfDefPer(){
  var docDefinition = {
              //iz,arri,dere,aba
    //  pageOrientation: 'landscape',
      pageSize: 'A4',
      background: [
        {
          image: await this.getBase64ImageFromURL(
            "../assets/icon/DEFENSAPERSONAL.jpeg"
          ),
            width: 600
        }
      ],
      content: [
        {
          columns: [
            { margin: [ 0, 140, 0, 5 ],width: '*', text: '' },
            {  margin: [ 0, 260, 0, 5 ],width: 'auto',text: 'A: '+this.lisUsuario.nombre, alignment: 'Center',fontSize: 23,bold:true },
            { width: '*', text: '' }
          ]
        },
        {
          columns: [
            { margin: [ 0, 120, 0, 5 ],width: '*', text: '' },
            {  margin: [ 0, 20, 0, 5 ],width: 'auto',text:'CI: '+this.lisUsuario.cedula, alignment: 'Center',fontSize: 23,bold:true },
            { width: '*', text: '' }
          ]
        },
     
       /* {
          columns: [
            { width: '*', text: '' },
            { bold:true ,margin: [ 0, 200, 0, 5 ],width: 'auto',text:'Desde:'+this.cursoSelec.fechaInicio+' Hasta: '+this.cursoSelec.fechaFin, alignment: 'Center',fontSize: 15 },
            { width: '*', text: '' },
          ]
        }, */
        {
          columns: [
            { width: '*', text: '' },
            { bold:true ,margin: [ 0, 110, 0, 5 ],width: 'auto',text: 'Fecha de Expedición: '+this.cursoSelec.fecExpedicion, alignment: 'Center',fontSize: 17 },
            { width: '*', text: '' },
          ]
        },

      ]
    };
    this.pdfObj=pdfMake.createPdf(docDefinition);
   // console.log(this.pdfObj);
    this.descargar();
}

async pdfEscoltaVip(){
  
  //console.log(this.lis.fecExespanol);
  var docDefinition = {
             //iz,arri,dere,aba 
    //  pageOrientation: 'landscape',
      pageSize: 'A4',
      background: [
        {
          image: await this.getBase64ImageFromURL(
            "../assets/icon/ESCOLTAVIP.jpeg"
          ),
            width: 600
        }
      ],
      content: [
        {
          columns: [
            { margin: [ 0, 150, 0, 5 ],width: '*', text: '' },
            {  margin: [ 0, 300, 0, 5 ],width: 'auto',text: 'A: '+this.lisUsuario.nombre, alignment: 'Center',fontSize: 23,bold:true },
            { width: '*', text: '' }
          ]
        },
        {
          columns: [
            { margin: [ 0, 120, 0, 5 ],width: '*', text: '' },
            {  margin: [ 0, 20, 0, 5 ],width: 'auto',text:'CI: '+this.lisUsuario.cedula, alignment: 'Center',fontSize: 23,bold:true },
            { width: '*', text: '' }
          ]
        },
     
       {
          columns: [
            { width: '*', text: '' },
            { bold:true ,margin: [ 0, 95, 0, 5 ],width: 'auto',text:'THIS CERTIFICATE IS REGISTERED IN ECUADOR ON '+this.lis.fecExingles+'.', alignment: 'Center',fontSize: 12 },
            { width: '*', text: '' },
          ]
        },
        {
          columns: [
            { width: '*', text: '' },
            { bold:true ,margin: [ 0, 5, 0, 5 ],width: 'auto',text: 'EL PRESENTE CERTIFICADO SE EXPIDE EN ECUADOR, A LOS '+this.lis.fecExespanol+'.', alignment: 'Center',fontSize: 12 },
            { width: '*', text: '' },
          ]
        },

      ]
    };
    this.pdfObj=pdfMake.createPdf(docDefinition);
   // console.log(this.pdfObj);
    this.descargar();
}

  descargar(){
    this.pdfObj.download();
  }


  logout(){
    localStorage.clear();
    this.router.navigate(["/login"]);
    
   
  }
}
