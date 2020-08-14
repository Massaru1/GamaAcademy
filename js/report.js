

function gerarRelatorio (){
   
   let usuarioLogado = localStorage.getItem("logado");

   
   var usuarioJson = JSON.parse(usuarioLogado);

        document.getElementById("perfil").innerHTML = 
            "<h3> Usuário: " + usuarioJson.nome + "</h3>";


   carregarDados();

   let dataAgendamento = document.getElementById("dataAgendamento").value
   let agencia = document.getElementById("cmbAgencias").value
   let cliente = document.getElementById("cliente").value


   if(dataAgendamento == "" && agencia != 0 && cliente== ""){
      if (agencia == 1){
         agencia = 'Mooca';
      }else if(agencia == 2){
         agencia = 'Interlagos';
      }else if (agencia == 3){
         agencia = 'Jabaquara'
      }else if (agencia == 4){
         agencia = 'Morumbi'
      }
   
      
      fetch('http://localhost:8080/agendamentoNomeAgencia/'+ agencia)
      .then(res => res.json())
      .then(res => {
         console.log(res);
         retornarAgendamentos(res)
      })
   }

   if(dataAgendamento == "" && agencia == 0 && cliente== "" || 
      dataAgendamento != "" && agencia != 0 && cliente != ""  ){
      fetch('http://localhost:8080/agencias')
      .then(res => res.json())
      .then(res => {
         console.log(res);
         retornarAgendamentos(res)
   })
   
}

if(dataAgendamento != "" && agencia == 0 && cliente == ""){

    //Converção na formatação de data.
    var Data = dataAgendamento;
    var ano = Data.substring(0, 4);
    var mes = Data.substring(5, 7);
    var dia = Data.substring(8);
    var dataFormatada = dia + "-" + mes + "-" + ano;

    var dmy = dataFormatada.split("-");
    var dtInformada = new Date(dmy[2], dmy[1] - 1, dmy[0]);


   let timestamp = dtInformada; 
   let data = new Date(timestamp);

  
 
      let formatado = data.toLocaleDateString("pt-BR").split("/")[0] + "-" + data.toLocaleDateString("pt-BR").split("/")[1] + "-" + data.toLocaleDateString("pt-BR").split("/")[2]
      
      fetch('http://localhost:8080/agendamentoData/'+formatado)
      .then(res => res.json())
      .then(res => {
         console.log(res);
         retornarAgendamentoPorData(res)
   })
}


if(dataAgendamento == "" && agencia == 0 && cliente != ""){
         fetch('http://localhost:8080/agendamentoNomeCliente/'+cliente)
         .then(res => res.json())
         .then(res => {
            console.log(res);
            retornarAgendamentoPorData(res)
      })
}



//Nome agencia e data
if(dataAgendamento != "" && agencia != 0 && cliente == ""){

         if (agencia == 1){
            agencia = 'Mooca';
         }else if(agencia == 2){
            agencia = 'Interlagos';
         }else if (agencia == 3){
            agencia = 'Jabaquara'
         }else if (agencia == 4){
            agencia = 'Morumbi'
         }


         
    //Converção na formatação de data.
    var Data = dataAgendamento;
    var ano = Data.substring(0, 4);
    var mes = Data.substring(5, 7);
    var dia = Data.substring(8);
    var dataFormatada = dia + "-" + mes + "-" + ano;

    var dmy = dataFormatada.split("-");
    var dtInformada = new Date(dmy[2], dmy[1] - 1, dmy[0]);


   let timestamp = dtInformada; 
   let data = new Date(timestamp);

  
 
   let formatado = data.toLocaleDateString("pt-BR").split("/")[0] + "-" + data.toLocaleDateString("pt-BR").split("/")[1] + "-" + data.toLocaleDateString("pt-BR").split("/")[2]



      fetch('http://localhost:8080/agendamentoAgenciaAndData/'+agencia+'/'+ formatado)
      .then(res => res.json())
      .then(res => {
         console.log(res);
         retornarAgendamentoPorData(res)
   })
   


}


//Nome agencia e nome cliente
if(dataAgendamento == "" && agencia != 0 && cliente != ""){

   if (agencia == 1){
      agencia = 'Mooca';
   }else if(agencia == 2){
      agencia = 'Interlagos';
   }else if (agencia == 3){
      agencia = 'Jabaquara'
   }else if (agencia == 4){
      agencia = 'Morumbi'
   }


fetch('http://localhost:8080/agendamentoAgenciaCliente/' + agencia + '/'+cliente+'')
.then(res => res.json())
.then(res => {
   console.log(res);
   retornarAgendamentoPorData(res)
})
}


//Nome do cliente e data
if(dataAgendamento != "" && agencia == 0 && cliente != ""){

  //Converção na formatação de data.
  var Data = dataAgendamento;
  var ano = Data.substring(0, 4);
  var mes = Data.substring(5, 7);
  var dia = Data.substring(8);
  var dataFormatada = dia + "-" + mes + "-" + ano;

  var dmy = dataFormatada.split("-");
  var dtInformada = new Date(dmy[2], dmy[1] - 1, dmy[0]);


 let timestamp = dtInformada; 
 let data = new Date(timestamp);



 let formatado = data.toLocaleDateString("pt-BR").split("/")[0] + "-" + data.toLocaleDateString("pt-BR").split("/")[1] + "-" + data.toLocaleDateString("pt-BR").split("/")[2]


fetch('http://localhost:8080/agendamentonomeClienteData/'+ cliente +'/'+formatado)
.then(res => res.json())
.then(res => {
   console.log(res);
   retornarAgendamentoPorData(res)
})

}

   

//GERACAO DAS TABELAS
function retornarAgendamentos (resp){

   let saida = 
   "<div class = 'row'>"+
   "<div class = 'col-12'>"+
   "<table class = 'table table-striped' border='1' cellpadding='5' cellspacing='2'>"+
   "<tr>"+
   "<th>Nome da Agência</th>"+
   "<th>Hora de Abertura</th>"+
   "<th>Hora de Fechamento</th>"+
   "<th>Nome do Cliente</th>"+
   "<th>Hora de agendamento</th>"+
   "<th>Data Agendada</th>"+
   "<th>Observacao</th>"
   "</tr>"

   resp.forEach(resp => {
      let aux = 0;

      saida += 

      "<tr>"+
      "<td>"+ resp.nomeAgencia + "</td>"+
      
      "<td>"+ resp.horaInicio + "</td>"+
      
      "<td>"+ resp.horaFim + "</td>"+

      "<td>"+ resp.agendamentos[aux].nomeCliente + "</td>"+

      "<td>"+ resp.agendamentos[aux].hora + "</td>"+

      "<td>"+ resp.agendamentos[aux].data + "</td>"+

      "<td>"+ resp.agendamentos[aux].observacao[aux] + "</td>"+
      "</tr>"

      aux++
   });

   saida += "</table></div></div>"

   document.getElementById('relatorio').innerHTML = saida;
}


function retornarAgendamentoPorData (resp){

   let saida = 
   "<div class = 'row'>"+
   "<div class = 'col-12'>"+
   "<table class = 'table table-striped' border='1' cellpadding='5' cellspacing='2'>"+
   "<tr>"+
   "<th>Cliente</th>"+
   "<th>E-mail</th>"+
   "<th>Celular</th>"+
   "<th>Data</th>"+
   "<th>Hora</th>"+
   "<th>Observacao</th>"+
   "<th>Agência</th>"

   "</tr>"

   resp.forEach(resp => {

      saida += 

      "<tr>"+
      "<td>"+ resp.nomeCliente + "</td>"+
      
      "<td>"+ resp.emailCliente + "</td>"+
      
      "<td>"+ resp.celularCliente + "</td>"+

      "<td>"+ resp.data + "</td>"+

      "<td>"+ resp.hora+ "</td>"+

      "<td>"+ resp.observacao + "</td>"+

      "<td>"+ resp.agencia.nomeAgencia + "</td>"+
      "</tr>"

   })
    
   saida += "</table></div></div>"

   document.getElementById('relatorio').innerHTML = saida;
}
}
   

//SABRINA.
function deslogar(){
  localStorage.removeItem("logado");
  window.location.href="index.html";
}

// Função para carregar as agências no combo
function carregarAgencias() {
  fetch("http://localhost:8080/agencias")
      .then(res => res.json())
      .then(res => preencherAgencias(res));
}

function preencherAgencias(lista) {
  var saida = "";
  for (i = 0; i < lista.length; i++) {
      saida +=
          "<option value =  ' " + lista[i].id + " '>" + lista[i].nomeAgencia + "</option>";
  }
  document.getElementById("cmbAgencias").innerHTML = saida;
}


function deslogar(){
   localStorage.removeItem("logado");
   window.location.href="index.html";
 }
 
 function carregarDados() {
   carregarAgencias();
   //carregarUsuario();
 }
 
 // Função para carregar as agências no combo
 function carregarAgencias() {
   fetch("http://localhost:8080/agencias")
       .then(res => res.json())
       .then(res => preencherAgencias(res));
 }
 
 function preencherAgencias(lista) {
   var saida = "";
   for (i = 0; i < lista.length; i++) {
       saida +=
           "<option value =  ' " + lista[i].id + " '>" + lista[i].nomeAgencia + "</option>";
   }
   document.getElementById("cmbAgencias").innerHTML = saida;
 }
 
 // Função para carregar o usuário logado
//  function carregarUsuario(){
        
//  }
