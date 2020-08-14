function logar(){
    window.alert("passei aqui");

    var usuario = document.getElementById("txtUsuario").value;
    if (usuario == ""){
        return alert("Usuário é um campo obrigatório");
    }

   var mensagem = {        
            nome: usuario,
            senha: document.getElementById("txtSenha").value
        }
   
   var cabecalho = {
       method:"POST",
       body:JSON.stringify(mensagem),
       headers:{
            "Content-Type":"application/json"
       }
    }

    fetch("http://localhost:8080/login", cabecalho)
    .then(res => res.json())
    .then(res=>{
        localStorage.setItem("logado",JSON.stringify(res));
        window.location="Relatorio.html";
    })
    .catch(err=>{
        window.alert("Usuario ou Senha incorretos!");
    });
}