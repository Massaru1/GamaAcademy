function agendar() {
    //validar campos 
    var Nome = document.getElementById("txtNome").value;
    if (Nome == "") {
        return alert("O campo nome é obrigatório");
    } 
     
    var Email = document.getElementById("txtEmail").value;
    var Celular = document.getElementById("txtCelular").value;
    if (Email == "" && Celular == "") {
        return alert("Informe ao menos um meio de contato: Email ou celular");
    } 
    
    // somar 1 dia a data atual
    var hoje = new Date();
    var ano1 = hoje.getFullYear();
    var mes1 = hoje.getMonth() + 1;
    var dia1 = hoje.getDate() + 1;
    var dataAgenda = dia1 + "/" + mes1 + "/" + ano1;

    var dmy = dataAgenda.split("/");
    var dtamanha = new Date(dmy[2], dmy[1] - 1, dmy[0]);

    //Converção na formatação de data.
    var Data = document.getElementById("txtData").value;
    var ano = Data.substring(0, 4);
    var mes = Data.substring(5, 7);
    var dia = Data.substring(8);
    var dataFormatada = dia + "/" + mes + "/" + ano;

    var dmy = dataFormatada.split("/");
    var dtInformada = new Date(dmy[2], dmy[1] - 1, dmy[0]);

    //Validar data 

    if (Data == "") {
        return alert("O campo data é obrigatório");
    } else if (dtInformada < dtamanha) {
        return alert("A data não pode ser igual ou anterior a data de hoje");
    }

    //Validar hora
    var Hora = document.getElementById("txtHora").value;
    var horaInformada = parseInt(Hora.substring(0, 2));
    if (Hora == "") {
        return alert("O campo hora é obrigatório");
    } else if (horaInformada < 10 || horaInformada > 14) {
        return alert("O horário de atendimento é das 10:00-AM às 14:00-PM");
    }

    var mensagem = {
        nomeCliente: Nome,
        emailCliente: Email,
        celularCliente: Celular,
        data: dataFormatada,
        hora: Hora,
        observacao: document.getElementById("txtObservacao").value,
        agencia: { id: document.getElementById("cmbAgencias").value }
    }


    var cabecalho = {
        method: "POST",
        body: JSON.stringify(mensagem),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }
    
    fetch("http://localhost:8080/agendar", cabecalho)
        .then(res => res.json())
        .then(res => {
            alert("Gravado com sucesso");
            window.location="index.html";
        })
        .catch(err => {
            alert("Erro");
        });
}

// função para listar todas as agências cadastradas usando o método GET

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