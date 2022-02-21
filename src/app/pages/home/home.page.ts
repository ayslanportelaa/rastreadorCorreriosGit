import { Component } from '@angular/core';
import { EMPTY } from 'rxjs';
import { CorreioService } from 'src/app/services/correio.service'; // Importação do Serviços para fazer requisições Http criado na página correio.service.ts
import { GlobalService } from 'src/app/services/global-service.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  showLoader: boolean;
  // Array onde irá ficar guardado o JSON com o retorno
  eventosCollection: any[] = [];
  dataHora: any;


  constructor(private CorreioService: CorreioService,
    public global: GlobalService,public toastController: ToastController) { }


  /////////////////////////////////////////////////////////
  /* Definindo a barra de progresso*/
  showProgressBar() {
    this.showLoader = true;
  }

  hideProgressBar() {
    this.showLoader = false;
  }
  /////////////////////////////////////////////////////////////
  
  /////////////////////////////////////////////////////////////////////////////
  /* Função que fica "escutando" o ion-searchbar*/
  localizarObjeto(codRastreio) {

    // Deixa Vísivel a barra de progresso da busca
    this.showProgressBar();

    // Imprime no console log qual código de rastreio foi digitado
    console.log(codRastreio.target.value);

    // Armazena numa variável o codigo de rastreio digitado no campo
    let codObjeto = codRastreio.target.value;

    // Só faz a requisição se houver alguma coisa digitado no campo
    if (codObjeto != '') {
      this.CorreioService.localizarObejto(codObjeto)
        .then(
          // Se houver uma resposta positiva sobre o objeto buscado iremos pegar o JSON 
          response => {
            let jsoncorreiopuro: any = response;
            console.table(jsoncorreiopuro);
            this.eventosCollection = jsoncorreiopuro.objetos[0].eventos;
            this.hideProgressBar();
            
           

           if(this.eventosCollection == undefined){
            this.msg();
            return;
           }
           
            

           
          }
        )
        // Se houver uma resposta negativa sobre o objeto buscado iremos disparar um aviso na tela
        .catch(erro => {
          console.log(erro);
          this.msg();
        

          //Assim que obter um retorno a barra de progresso é encerrada
          this.hideProgressBar();
        });
    }


    // Se o campo estiver vazio após alguma busca iremos limpar a tela e não exibir a barra de progresso da busca
    if (codObjeto == '') {
      this.eventosCollection = [] = [];
      this.hideProgressBar();

    }
  }
  
  async msg() {
    const toast = await this.toastController.create({
      message:'Objeto não encontrado',
      duration: 3000,
      color:'danger',
      icon:'alert-circle'
    });
    toast.present();
  }
 

}
