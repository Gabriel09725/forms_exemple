// ===== onload =====
function boasVindas() {
    console.log("Bem-vindo(a) ao site da Seleção Francesa! 🇫🇷");
}

// ===== título do form =====
function mudar_text() {
    document.getElementById("titulo_form").innerText = "Faça seu cadastro!";
}
function mudar_cor() {
    document.getElementById("titulo_form").style.color = "#ED2939";
}
function mudar_cor2() {
    document.getElementById("titulo_form").style.color = "#002395";
}

// ===== classificação =====
function marcarClassificado(linha) {
    linha.style.backgroundColor = "#c8f7c5";
    linha.style.fontWeight = "bold";
}

function marcar3Classificado(linha) {
    linha.style.backgroundColor = "rgb(255, 244, 141)";
    linha.style.fontWeight = "bold";

}
function marcarUltimo(linha) {
    linha.style.backgroundColor = "#f7c5c5";
    linha.style.textDecoration = "line-through";
}
function resetar(linha) {
    linha.style.backgroundColor = "";
    linha.style.fontWeight = "";
    linha.style.textDecoration = "";
}

// ===== cadastro =====
function destacar(campo) { campo.style.borderColor = "#ED2939"; campo.style.background = "#fff8f8"; }
function normalizar(campo) { campo.style.borderColor = "#ccc"; campo.style.background = "#fff"; }

function contarLetras(campo) {
    
}

function escolherJogador(sel) {
    const msg = document.getElementById("msgJogador");
    msg.innerText = sel.value ? "Boa escolha! Seu ídolo é " + sel.value + "": "";
}


/////AQUUIIIII

function getInputs() {
    return {
        nome: document.getElementById('nome'),
        email: document.getElementById('email'),
        senha: document.getElementById('senha')
    };
}

function getValores({ nome, email, senha }) {
    return {
        nome: nome.value.trim(),
        email: email.value.trim(),
        senha: senha.value.trim()
    };
}

async function cadastrar() {
    const inputs = getInputs();
    const dados = getValores(inputs);

   
     await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });

    
    window.location.href = './../pages/resultado.html';
}

async function mostrarResultado() {
    const resultadoDiv = document.getElementById('resultado');
    const resposta = await fetch('/api/usuarios');
    const usuarios = await resposta.json();

    if (usuarios.length === 0) {
        resultadoDiv.innerHTML = '<p>Nenhum usuário cadastrado ainda.</p>';
        return;
    }

    let html = '<table><thead><tr><th>ID</th><th>Nome</th><th>Email</th><th>Senha</th></tr></thead><tbody>';
    for (const usuario of usuarios) {
        html += `<tr><td>${usuario.id}</td><td>${usuario.nome}</td><td>${usuario.email}</td><td>${usuario.senha}</td></tr>`;
    }
    html += '</tbody></table>';

    resultadoDiv.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function () {
    const btnEnviar = document.getElementById('btnEnviar');
    if (btnEnviar) {
        btnEnviar.addEventListener('click', function (event) {
            event.preventDefault();
            cadastrar();
        });
    }

    if (document.getElementById('resultado')) {
        mostrarResultado();
    }
});
