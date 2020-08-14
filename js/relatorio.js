
function carregarAgencias(){

    fetch("http://localhost:8080/agencias")
    .then(res=>res.json())
    .then(res => preencherAgencias(res));

}

function carregarUsuario() {
    var userStr=localStorage.getItem("user");
    if (!userStr=="logado"){
        window.location="index.html";
    }else{
        var user = JSON.parse(userStr);
        document.getElementById("perfil").innerHTML=
        "<h3>"+user.nome+"("+user.racf+")<br>";
}

    document.getElementById("fotoUsuario").innerHTML="<img src=images/"+user.foto+"width='20%'>";
    

    fetch("http://localhost:8080/agendar" , cabecalho)
    .then(res => res.json())
    .then(res => {
        localStorage.setItem("user",JSON.stringify(res));
        window.location="relatorio.html";
    })
    .catch(err => {
        document.getElementById("meuerro").style.visibility="visible";
    });
}

function gerarPDF(){
    let form = document.getElementById("agendamentos").innerHTML;

    let janela = window.open('','','widht=800 height=600')
    janela.document.write('<html> <head>')
    janela.document.write('<title> PDF </title></head>')
    janela.document.write('<body>')
    janela.document.write(form)
    janela.document.write('</body>')
    janela.document.close()
    janela.print()
}

function gerarExcel(){
    let form = document.getElementById("agendamentos");
    var html = form.outerHTML;
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
    encodeURIComponent.preventDefault();
}
 
function pesquisar(){

    var agencia     = document.getElementById("txtAgencia").value;
    var data        = document.getElementById("txtData").value;
    var nomeCliente = document.getElementById("txtCliente").value;
    
    // Se relatorio sem filtros, listar todos os agendamentos.
    if (agencia.value == null && data.value == null && nomeCliente.value == null){
      fetch("http://localhost:8080/agendamento")
      .then(res=>res.json())
      .then(res => gerarRelatorio(res));
    }  

    // Se relatorio com filtro por agencia
    if (agencia.value != null && data.value == null && Cliente.value == null) {
      fetch("http://localhost:8080/agendamentoNomeAgencia")
     .then(res=>res.json())
      .then(res => gerarRelatorio(res));
    }

    // Se relatorio com filtro por data
    if (agencia.value == null && data.value != null && nomeCliente.value == null){
       fetch("http://localhost:8080/agendamentoData")
       .then(res=>res.json())
       .then(res => gerarRelatorio(res));
    }

    // Se relatorio com filtro por cliente
    if (agencia.value == null && data.value == null && nomeCliente.value != null){
       fetch("http://localhost:8080/agendamentoNomeCliente")
       .then(res=>res.json())
       .then(res => gerarRelatorio(res));
    }
}





function gerarRelatorio(lista){
    var saida = 

    "<div class='row'>" +
       "<div class='col-12'>" +
       "<table border='1' cellpadding='5' cellspacing='2' align='center' width='80%'>" +
       "<tr>" +
       "<th>Cliente</th> <th>Email</th> <th>Celular</th> <th>Data</th> <th>Hora</th> <th>Observacao</th> <th>Agência</th>" +
       "</tr>";

       for (i=0; i < lista.length; i++){
           saida+=
           "<tr>" +
             "<td>" + lista[i].nomeCliente + "</td>" +
             "<td>" + lista[i].emailCliente + "</td>" +
             "<td>" + lista[i].celularCliente + "</td>" +
             "<td>" + lista[i].data + "</td>" +
             "<td>" + lista[i].hora + "</td>" +
             "<td>" + lista[i].observacao + "</td>" +
             "<td>" + lista[i].agencia + "</td>" 
           "</tr>";
       }

    saida+="</table></div></div>";
    document.getElementById("agendamentos").innerHTML=saida;
}

